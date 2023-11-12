function Canvas({ listElements }) {

    let pressed = false;
    let currentElement = null;

    function mouseDownHandler(event) {
        const element = event.target.parentNode;

        if (element.className.baseVal === 'element') {
            pressed = true;
            currentElement = element;
        }
    }

    function mouseUpHandler() {
        pressed = false;
        currentElement = null;
    }

    function mouseMoveHandler(event) {
        if (pressed && currentElement.className.baseVal === 'element') {
            const { clientX, clientY } = event;

            let w = parseInt(currentElement.getAttribute('width'));
            let h = parseInt(currentElement.getAttribute('height'));

            currentElement.setAttribute('x', clientX - w / 2 - document.getElementById('svg').getBoundingClientRect().left);
            currentElement.setAttribute('y', clientY - h / 2 - document.getElementById('svg').getBoundingClientRect().top);
        }
    }

    function dragOverHandler(event) {
        event.preventDefault();
    }


    function dropHandler(event) {
        event.preventDefault();

        const { clientX, clientY } = event;
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(event.dataTransfer.getData('text/html'), 'text/html');
        const element = parsedHtml.body.firstChild;

        let w = parseInt(element.getAttribute('width'));
        let h = parseInt(element.getAttribute('height'));

        element.setAttribute('x', clientX - w / 2 - document.getElementById('svg').getBoundingClientRect().left);
        element.setAttribute('y', clientY - h / 2 - document.getElementById('svg').getBoundingClientRect().top);

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
                    <rect fill="white" width="100%" height="100%" />
                    {listElements.map(element =>
                        element
                    )}
                </svg>
            </div>
        </>
    )
}

export default Canvas;