/**
 * Создает компонент, отвечающий за отрисовку элементов и взаимодействия с ними.
 * @param props.listElements Список элементов для отрисовки на полотне.
 * @returns Полотное с отрисованными элементами.
 */
function Canvas({ listElements }) {

    let isPressed = false;
    let currentElement = null;

    /**
     * Помещает центр переданного элемента под курсор.
     * @param event Событие мыши.
     * @param element Элемент, центр которого необходимо поместить под курсор.
     */
    function getCenterElementUnderCursor(event, element) {
        const { clientX, clientY } = event;

        let w = parseInt(element.getAttribute('width'));
        let h = parseInt(element.getAttribute('height'));

        element.setAttribute('x', clientX - w / 2 - document.getElementById('svg').getBoundingClientRect().left);
        element.setAttribute('y', clientY - h / 2 - document.getElementById('svg').getBoundingClientRect().top);
    }

    /**
     * Обрабатывает событие onmousedown для элемента
     */
    function mouseDownHandler(event) {
        const element = event.target.parentNode;

        if (element.classList.contains('element')) {
            isPressed = true;
            currentElement = element;
            currentElement.classList.add('element-moving')
            
        }
    }

    /**
     * Обрабатывает событие onmouseup.
     */
    function mouseUpHandler() {
        isPressed = false;
        //currentElement.classList.remove('element-moving');
        currentElement = null;

    }

    /**
     * Обрабатывает событие onmousemove, устанавливает новые координаты для элемента.
     */
    function mouseMoveHandler(event) {
        if (isPressed && currentElement.classList.contains('element')) {
            getCenterElementUnderCursor(event, currentElement);
        }
    }

    /**
     * Обрабатывает события ondragover.
     */
    function dragOverHandler(event) {
        event.preventDefault();
    }

    /**
     * Обрабатывает события ondrop.
     */
    function dropHandler(event) {
        event.preventDefault();

        const parser = new DOMParser();

        // Парсится строку, в которой содержится svg, для получения DOM объекта.
        const parsedHtml = parser.parseFromString(event.dataTransfer.getData('text/html'), 'text/html');
        const element = parsedHtml.body.firstChild;

        getCenterElementUnderCursor(event, element);

        event.target.parentNode.append(element);
    }

    return (
        <>
            <div className="canvas">
                <svg id='svg'
                    xmlns="http://www.w3.org/2000/svg"
                    width="2000px"
                    height="2000px"
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    onDragOver={dragOverHandler}
                    onDrop={dropHandler}
                >
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="lightgray" stroke-width="1" />
                        </pattern>
                    </defs>
                    <g>
                        <rect fill="url(#grid)" width="100%" height="100%" />
                        {listElements.map(element =>
                            element
                        )}
                    </g>
                </svg>
            </div>
        </>
    )
}

export default Canvas;