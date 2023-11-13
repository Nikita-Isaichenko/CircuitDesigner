import { Fragment } from "react";


/**
 * Создает компонент с элементом внутри для панели элементов.
 * @param props.element Элемент для вставки в кнопку.
 * @param props.onClick Функция для обработки события onclick.
 * @returns HTML для ButtonElement.
 */
function ButtonElement({ element, onClick }) {

    /**
     * Создает и кастомизирует DOM объект,
     * который будет использоваться в качестве призрачной картинки при drag'n'drop.
     * @param element Элемент, который будет использоваться в качестве основы.
     * @returns DOM объект с кастомизацией.
     */
    function createDragImage(element) {
        //Копируем объект, чтобы цвет обводки не менялся у элементов на полотне и панели.
        const dragImg = element.cloneNode(true);
        const container = document.createElement('div');

        container.id = 'dragimage';
        container.style.position = 'absolute';
        container.style.zIndex = '-1';
        container.style.border = 'dashed #0ccafa'
        container.append(dragImg);

        dragImg.childNodes.forEach(element => {
            if (element.tagName !== 'rect') {
                element.setAttribute('stroke', 'gray');
            }
        });

        document.body.append(container);

        return container;
    }

    /**
     * Обрабатывает событие ondragstart, устанавливая объект для drag'n'drop.
     */
    function dragStartHandler(event) {
        const dragImg = createDragImage(event.target.childNodes[0]);

        event.dataTransfer.setDragImage(dragImg, 50, 14);
        event.dataTransfer.setData('text/html', event.target.innerHTML);
    }

    return (
        <>
            <button className="elementButton"
                onClick={() => onClick(element)}
                draggable={true}
                onDragStart={dragStartHandler}>
                {element}
            </button>
        </>
    )
}

export default ButtonElement;