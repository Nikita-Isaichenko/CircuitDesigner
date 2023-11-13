import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";
import PageList from "../elements/PageList";


const initData = [<Resistor x="1000" y="1000" width="100" height="50" />,
<Capacitor x="1000" y="1000" width="100" height="50" />,
<InductionCoil x="1000" y="1000" width="100" height="50" />
]

/**
 * Создает компонент главной страницы.
 * @returns Возвращает главную страницу.
 */
function Home() {

    const [elements, setElements] = useState(initData);

    /**
     * Обрабатывает клик по элементу и добавляет его на полотно.
     * @param element Элемент для добавления на полотно.
     */
    function clickHandler(element) {
        const newElements = [...elements];

        newElements.push(element);

        setElements(newElements);
    }

    return (
        <>
            <div className="container">
                <Panel title="Фигуры" listElements={initData} handleForButton={clickHandler} />
                <div className="canvas-container">
                    <Canvas listElements={elements}/>
                    <PageList />
                </div>

            </div>
        </>
    )
}

export default Home;

