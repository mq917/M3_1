window.addEventListener('mousedown', function(e) {
    //получаем className элем. на которого кликаем
    let a = document.elementFromPoint(e.clientX, e.clientY).className;
    if (a == 'head1') {
        //проверяем если class элемента совпадает - выполняем
        let box = document.getElementById('p');
        let div = document.getElementById('div');
        div.classList.add('shadow');

        // 1. отслеживаем нажатие.подготавливаем к перемещению
        function moveAt(e) {
            // 2. размещаем на том же месте, но в абсолютных координатах
            div.style.left = e.pageX - box.offsetWidth + 170 + 'px';
            // передвинуть box под координаты курсора
            div.style.top = e.pageY - box.offsetHeight - 53 + 'px';
            // и сдвинуть на половину ширины/высоты для центрирования
        }
        box.onmousemove = function(e) { // 3. перемещаем по экрану
            moveAt(e);
        }
        div.onmouseup = function() {
            // 4. отслеживаем окончание переноса
            div.classList.remove('shadow');
            box.onmousemove = null;
            div.onmouseup = null;
        }
    }

    //КНОБКА УДАЛЕНИЯ ЗАПИСОК
    //получаем id элем. на которого кликаем
    let b = document.elementFromPoint(e.clientX, e.clientY).id;
    // возвращает указанное количество символов из строки, начиная с указанной позиции.
    if (b.substr(0, 6) == 'delete') {
        let elem = document.getElementById('li' + b.substr(6, ));
        //находим по id элемент
        elem.parentNode.removeChild(elem);
        //удаляем этот элемент
    }
}, false);

let ul = document.getElementById("list");
let id = 1;

function add_input() {
    let new_li = document.createElement('li');
    //создаем li
    new_li.className = 'li';
    //добавляем сlass
    new_li.id = 'li' + id;
    new_li.draggable = true;
    ul.append(new_li);
    //добавляем новый li
    new_li.innerHTML = '<span class="muveText" id="muveText' + id + '">::</span><input id="input' + id + '" class="input"><span class="delete" id="delete' + id + '">x</span>';
    //внутрь li добавляем элементы
    id++;
};

//список
function sortable(rootEl, onUpdate) {
    let dragEl;
    // Фнукция отвечающая за сортировку
    function _onDragOver(evt) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        let target = evt.target;
        if (target && target !== dragEl && target.nodeName == 'LI') {
            // Сортируем
            rootEl.insertBefore(dragEl, target.nextSibling || target);
        }
    }
    // Окончание сортировки
    function _onDragEnd(evt) {
        evt.preventDefault();
        dragEl.classList.remove('ghost');
        rootEl.removeEventListener('dragover', _onDragOver, false);
        rootEl.removeEventListener('dragend', _onDragEnd, false);
        // Сообщаем об окончании сортировки
        onUpdate(dragEl);
    }
    // Начало сортировки
    rootEl.addEventListener('dragstart', function(evt) {
        dragEl = evt.target; // Запоминаем элемент который будет перемещать
        // Ограничиваем тип перетаскивания
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);
        // Пописываемся на события при dnd
        rootEl.addEventListener('dragover', _onDragOver, false);
        rootEl.addEventListener('dragend', _onDragEnd, false);
        setTimeout(function() {
            // Если выполнить данное действие без setTimeout, то
            // перетаскиваемый объект, будет иметь этот класс.
            dragEl.classList.add('ghost');
        }, 0)
    }, false);
}
// Используем
sortable(document.getElementById('list'), function(item) {
    console.log(item);
});

//видимость кнобки сортировки списка
let img_listN = document.getElementById('spisokn');
let img_listV = document.getElementById('spisokv');
img_listV.classList.add('ghostOff');

document.getElementById('spisokn').addEventListener('click', function() {
    a_sort(0);
    img_listN.classList.remove('ghostOff');
    img_listV.classList.add('ghostOff');
});
document.getElementById('spisokv').addEventListener('click', function() {
    a_sort(1);
    img_listV.classList.remove('ghostOff');
    img_listN.classList.add('ghostOff');
});

add_input(); //создвние списка при 1-ом запуске
document.getElementById('but').addEventListener('click', function() {
    add_input();
});

//сортировка вводимых значений в списке
function a_sort(change) {
    let element = document.querySelectorAll('input');
    console.log(element);
    console.log(NodeList[0]);

    let a = 0;
    let c = '';
    inputs = '';
    let b = document.getElementsByTagName("input");
    for (let i = 0; i < document.getElementsByTagName("input").length; i++) { //проходится по всем тегам input
        if (b[i].type == 'text') {
            a++; //Считает сколько тегов input type="text"
            inputs = inputs + b[i].id + ', ';
            console.log(inputs);
            c = c + b[i].value + ' ';
            console.log(c);
        }
        // split разделяет строку и превращает в массив
    };
    const arr = c.split(' ');
    //неотсортиррованный массив
    arr.pop();
    //очищенный от пустых строк
    if (change === 1) {
        arr.sort((a, b) => { //сортировка
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
    } else {
        arr.sort((a, b) => { //обратная сортровка
            if (a < b) {
                return 1;
            }
            if (a > b) {
                return -1;
            }
            return 0;
        });
    }

    for (let i = 0; i < document.getElementsByTagName("input").length; i++) { //проходится по всем тегам input
        if (b[i].type == 'text') { //Если type="text"
            b[i].value = arr[i]; //меняем значение input на сортированный
        }
    };
};