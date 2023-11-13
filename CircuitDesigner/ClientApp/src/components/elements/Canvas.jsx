/**
 * Создает компонент, отвечающий за отрисовку элементов и взаимодействия с ними.
 * @param props.listElements Список элементов для отрисовки на полотне.
 * @returns Полотное с отрисованными элементами.
 */
function Canvas({ listElements }) {

    let isPressed = false;
    let currentElement = null;

    /**
     * Обрабатывает событие onmousedown для элемента
     */
    function mouseDownHandler(event) {
        const element = event.target.parentNode;

        if (element.className.baseVal === 'element') {
            isPressed = true;
            currentElement = element;
        }
    }

    /**
     * Обрабатывает событие onmouseup.
     */
    function mouseUpHandler() {
        isPressed = false;
        currentElement = null;
    }

    /**
     * Обрабатывает событие onmousemove, устанавливает новые координаты для элемента.
     */
    function mouseMoveHandler(event) {
        if (isPressed && currentElement.className.baseVal === 'element') {
            const { clientX, clientY } = event;

            let w = parseInt(currentElement.getAttribute('width'));
            let h = parseInt(currentElement.getAttribute('height'));

            currentElement.setAttribute('x', clientX - w / 2 - document.getElementById('svg').getBoundingClientRect().left);
            currentElement.setAttribute('y', clientY - h / 2 - document.getElementById('svg').getBoundingClientRect().top);
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

        const { clientX, clientY } = event;
        const parser = new DOMParser();

        // Парсится строку, в которой содержится svg, для получения DOM объекта.
        const parsedHtml = parser.parseFromString(event.dataTransfer.getData('text/html'), 'text/html');
        const element = parsedHtml.body.firstChild;

        let w = parseInt(element.getAttribute('width'));
        let h = parseInt(element.getAttribute('height'));

        element.setAttribute('x', clientX - w / 2 - document.getElementById('svg').getBoundingClientRect().left);
        element.setAttribute('y', clientY - h / 2 - document.getElementById('svg').getBoundingClientRect().top);

        event.target.parentNode.append(element);

        // Удаляет элемент, который используется для dragImage.
        document.body.removeChild(document.getElementById('dragimage'));
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