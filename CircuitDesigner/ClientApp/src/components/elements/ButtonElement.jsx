/**
 * Создает компонент с элементом внутри для панели элементов.
 * @param props.element Элемент для вставки в кнопку.
 * @param props.onClick Функция для обработки события onclick.
 * @returns HTML для ButtonElement.
 */
function ButtonElement({ element, onClick }) {

    // Необходима, чтобы точно размещать элемент при drag and drop по вертикали.
    const correctionForY = 1;

    /**
     * Создает и кастомизирует DOM объект,
     * который будет использоваться в качестве призрачной картинки при drag'n'drop.
     * @param element Элемент, который будет использоваться в качестве основы.
     * @returns DOM объект с кастомизацией.
     */
    function createDragImage(element) {
        
        // Копируем объект, чтобы цвет обводки не менялся у элементов на полотне и панели.
        const dragImg = element.cloneNode(true);
        
        const container = document.getElementById('dragImage');

        if (container.children.length !== 0)
        {
            // Удаляю все дочерние объекты.
            container.replaceChildren();
        }

        dragImg.classList.add('element-moving')

        container.append(dragImg);

        return dragImg;
    }

    /**
     * Обрабатывает событие ondragstart, устанавливая объект для drag'n'drop.
     */
    function dragStartHandler(event) {
        const dragImg = createDragImage(event.target.childNodes[0]);

        event.dataTransfer.setDragImage(dragImg, dragImg.getAttribute('width')/2, dragImg.getAttribute('height')/2 + correctionForY);
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