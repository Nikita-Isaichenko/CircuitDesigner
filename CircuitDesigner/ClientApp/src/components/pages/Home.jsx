import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";
import PageList from "../elements/PageList";


const initData = [<Resistor x="140" y="140" width="100" height="50" />,
<Capacitor x="100" y="100" width="50" height="50" />,
<InductionCoil x="120" y="120" width="100" height="50" />
]

let scale = 1;
/**
 * Создает компонент главной страницы.
 * @returns Возвращает главную страницу.
 */
function Home() {
    // Размер одной клетки.
    let sizeCell = 10;

    const [elements, setElements] = useState([]);
    //const [scale, setScale] = useState(1);

    let isDrag = false;
    let isPressed = false;
    let currentElement = null;
    let scalableCell = sizeCell * scale;


    /**
     * Обрабатывает клик по элементу и добавляет его на полотно.
     * @param element Элемент для добавления на полотно.
     */
    function clickHandler(element) {
        const newElements = [...elements];

        newElements.push(element);

        setElements(newElements);
    }

    /**
     * Устанавливает картинку при переносе около курсора.
     * @param event Эвент события.
     */
    function setDragImagePosition(event) {
        const { clientX, clientY } = event;

        currentElement.style.left = clientX + 'px';
        currentElement.style.top = clientY + 'px';
    }

    /**
     * Помещает центр переданного элемента под курсор.
     * @param event Событие мыши.
     * @param element Элемент, центр которого необходимо поместить под курсор.
     */
    function setCenterElementUnderCursor(event, element) {

        const { clientX, clientY } = event;

        console.log(clientX)
        console.log(scale);

        let w = parseInt(element.getAttribute('width'));
        let h = parseInt(element.getAttribute('height'));

        const x = Math.floor((clientX - (w / scale) / 2 - document.getElementById('svg').getBoundingClientRect().left) / scalableCell * scale) * scalableCell;
        const y = Math.floor((clientY - (h / scale) / 2 - document.getElementById('svg').getBoundingClientRect().top) / scalableCell * scale) * scalableCell;

        element.setAttribute('x', Math.max(x, 0));
        element.setAttribute('y', Math.max(y, 0));
    }

    /**
     * Обрабатывает событие onmousedown для элемента
     */
    function mouseDownHandler(event) {
        const element = event.target.parentNode;

        if (element.classList.contains('element') && event.currentTarget.tagName === 'BUTTON' && !isDrag) {
            isDrag = true;
            currentElement = element.cloneNode(true);

            document.querySelector('.panel').append(currentElement);

            currentElement.classList.add('element-moving');
            currentElement.classList.add('element-draging');

            // Костыль, чтобы при обычном клике не было видно drag image.
            currentElement.style.left = -1000 + 'px';

            return;
        }

        if (element.classList.contains('element')) {
            isPressed = true;
            currentElement = element;
            currentElement.classList.add('element-moving');
        }
    }

    /**
     * Обрабатывает событие onmousemove, устанавливает новые координаты для элемента.
     */
    function mouseMoveHandler(event) {
        if (isPressed) {
            setCenterElementUnderCursor(event, currentElement);
        }

        if (isDrag) {
            if (event.currentTarget.tagName === 'svg') {
                currentElement.classList.remove('element-draging');
                event.currentTarget.append(currentElement);
                isDrag = false;
                isPressed = true;

                setCenterElementUnderCursor(event, currentElement);
            }

            setDragImagePosition(event);
        }
    }

    /**
     * Обрабатывает событие onmouseup.
     */
    function mouseUpHandler() {
        isPressed = false;
        if (isDrag) {
            currentElement.remove();
            isDrag = false;
        }

        if (currentElement !== null) {
            currentElement.classList.remove('element-moving');
            currentElement.classList.remove('element-draging')
            currentElement = null;
        }
    }

    function wheelHandler(event) {
        event.preventDefault();

        const delta = event.deltaY;

        scale += delta > 0 ? -0.1 : 0.1;

        scale = Math.max(0.1, Math.min(scale, 4));

        document.getElementById('svg').setAttribute('viewBox', `0 0 ${document.getElementById('svg').clientWidth * scale} ${document.getElementById('svg').clientHeight * scale}`);
        console.log(scale);
    }

    return (
        <>
            <div className="container">
                <Panel
                    title="Фигуры"
                    listElements={initData}
                    handleForButton={clickHandler}
                    mouseDownHandler={mouseDownHandler}
                    mouseMoveHandler={mouseMoveHandler}
                    mouseUpHandler={mouseUpHandler}
                />
                <div className="canvas-container">
                    <Canvas
                        listElements={elements}
                        mouseDownHandler={mouseDownHandler}
                        mouseMoveHandler={mouseMoveHandler}
                        mouseUpHandler={mouseUpHandler}
                        wheelHandler={wheelHandler}
                        scale={scale}
                    />
                    <PageList />
                </div>
            </div>
        </>
    )
}

export default Home;