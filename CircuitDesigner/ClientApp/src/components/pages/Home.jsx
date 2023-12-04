import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";
import PageList from "../elements/PageList";


const initData = [<Resistor x="1200" y="1200" width="100" height="50" />,
<Capacitor x="1200" y="1200" width="50" height="50" />,
<InductionCoil x="1000" y="1000" width="100" height="50" />
]

/**
 * Создает компонент главной страницы.
 * @returns Возвращает главную страницу.
 */
function Home() {

    let scale = 1; 
    let offsetX = 0;
    let offsetY = 0;
    let sizeCell = 10*scale;
    let isDrag = false;
    let isPressed = false;
    let currentElement = null;

    const [elements, setElements] = useState([]);

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
        console.log(scale)
        let w = parseInt(element.getAttribute('width'));
        let h = parseInt(element.getAttribute('height'));

        const x = Math.floor((clientX / scale - w / 2 - document.getElementById('svg').getBoundingClientRect().left / scale) / sizeCell) * sizeCell;
        const y = Math.floor((clientY / scale - h / 2 - document.getElementById('svg').getBoundingClientRect().top / scale) / sizeCell) * sizeCell;

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
        const delta = event.deltaY;
        const svgCanvas = document.getElementById('svg');

        scale += delta > 0 ? -0.1 : 0.1;

        // Ограничение масштаба
        scale = Math.max(0.1, Math.min(scale, 3));

        const mouseX = event.clientX - svgCanvas.getBoundingClientRect().left;
        const mouseY = event.clientY - svgCanvas.getBoundingClientRect().top;

        // Рассчитываем смещение для центрирования масштаба относительно точки курсора
        const newOffsetX = (mouseX - offsetX) * (1 - scale / 2);
        const newOffsetY = (mouseY - offsetY) * (1 - scale / 2);

        // Применение масштаба и смещения к SVG
        svgCanvas.style.transform = `scale(${scale})`;

        // Обновляем значения смещения
        offsetX = mouseX;
        offsetY = mouseY;
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
                    />
                    <PageList />
                </div>

            </div>
        </>
    )
}

export default Home;