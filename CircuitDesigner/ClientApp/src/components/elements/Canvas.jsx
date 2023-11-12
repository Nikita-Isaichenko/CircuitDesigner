import { useState } from "react";

function Canvas(props) {

    let pressed = false;
    let currentElement = null;
    const [currentPositionElement, setCurrentPositionElement] = useState(null);
    const [elements, setElements] = useState(props.listElements);

    function mouseDownHandler(event) {
        if (event.target.parentNode.getAttribute('class') === 'element')
        {

            pressed = true;
            currentElement = event.target.parentNode;
            console.log(currentElement);
        }
    }

    function mouseUpHandler() {
        pressed = false;
        currentElement = null;
        setElements(elements);
    }

    function mouseMoveHandler(event) {
        if (pressed && currentElement.getAttribute('class') === 'element'){
            console.log(currentElement.getAttribute('x'));

            const { clientX, clientY } = event;
            let w = parseInt(currentElement.getAttribute('width'));
            let h = parseInt(currentElement.getAttribute('height'));
            console.log(w, h)
            currentElement.setAttribute('x', clientX - w/2 - document.getElementById('svg').getBoundingClientRect().left);
            currentElement.setAttribute('y', clientY - h/2 - document.getElementById('svg').getBoundingClientRect().top);
        }
    }

    return (
        <div className="canvas">
            <svg id='svg'
                width="100%"
                height="95%"
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}
            >
                <rect fill="white" width="100%" height="100%" />
                {props.listElements.map(element => 
                     element        
                )}
            </svg>
            <form action="">
                <label>1 стр.</label>
                <input type="radio" name="page" />
                <label>2 стр.</label>
                <input type="radio" name="page" />
                <label>3 стр.</label>
                <input type="radio" name="page" />
            </form>
        </div>
    )
}

export default Canvas;