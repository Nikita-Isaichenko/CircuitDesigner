import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";
import PageList from "../elements/PageList";


const initData = [<Resistor x="1000" y="1000" width="100" height="50" />,
<Capacitor x="1200" y="1200" width="50" height="50" />,
<InductionCoil x="1100" y="1100" width="100" height="50" />
]

const settings = {
    scale: 1,
    sizeCell: 10,
    width: 2000,
    height: 2000,
    viewBox: {
        x: 1000,
        y: 1000,
    },
    getScalableCell: function () {
        return Math.floor(this.scale * this.sizeCell);
    }
}

/**
 * Создает компонент главной страницы.
 * @returns Возвращает главную страницу.
 */
function Home() {
    // Размер одной клетки.
    //let sizeCell = 10;
    console.log('scalable cell ' + settings.getScalableCell());
    console.log('обновление')
    const [elements, setElements] = useState([]);

    let isDrag = false;
    let isPressed = false;
    let currentElement = null;

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

        

        let w = parseInt(element.getAttribute('width'));
        let h = parseInt(element.getAttribute('height'));
        console.log(w)
        const x = Math.floor((clientX - (w / 2) / settings.scale - document.getElementById('svg').getBoundingClientRect().left) * settings.scale / settings.sizeCell) * settings.sizeCell;
        const y = Math.floor((clientY - (h / 2) / settings.scale - document.getElementById('svg').getBoundingClientRect().top) * settings.scale / settings.sizeCell) * settings.sizeCell;

        console.log(x)  
        element.setAttribute('x', Math.max(x + Math.floor(settings.viewBox.x / 10) * 10, 0));
        element.setAttribute('y', Math.max(y + Math.floor(settings.viewBox.y / 10) * 10, 0));

        console.log('viewbox X: ' + settings.viewBox.x);
        console.log('element' + element.getAttribute('x'))
        console.log('scale' + settings.scale)
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
        else {
            isPressed = true;
        }
    }

    /**
     * Обрабатывает событие onmousemove, устанавливает новые координаты для элемента.
     */
    function mouseMoveHandler(event) {

        if (isPressed && currentElement === null) {
            settings.viewBox.x -= Math.floor(event.movementX * settings.scale);
            settings.viewBox.y -= Math.floor(event.movementY * settings.scale);

            const svg = document.getElementById('svg');
            
            svg.setAttribute('viewBox',
                `${Math.floor(settings.viewBox.x)}
                 ${Math.floor(settings.viewBox.y) }
                 ${svg.clientWidth * settings.scale}
                 ${svg.clientHeight * settings.scale}`);

            return
        }

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

        settings.scale += delta > 0 ? -0.2 : 0.2;
        settings.scale = Math.max(0.2, Math.min(settings.scale, 4));

        document
            .getElementById('svg')
            .setAttribute('viewBox',
                `${settings.viewBox.x}
                 ${settings.viewBox.y}
                 ${document.getElementById('svg').clientWidth * settings.scale}
                 ${document.getElementById('svg').clientHeight * settings.scale}`);
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
                        settings={settings}
                    />
                    <PageList />
                </div>
            </div>
        </>
    )
}

export default Home;