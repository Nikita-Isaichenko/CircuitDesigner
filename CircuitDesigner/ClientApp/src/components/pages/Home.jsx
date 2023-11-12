import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";


const initData = [<Resistor x="10" y="10" width="100" height="50" />,
 <Capacitor x="10" y="10" width="100" height="50" />,
 <InductionCoil x="10" y="10" width="100" height="50" />
]

function Home() {

    const [elements, setElements] = useState([]);

    const handleClick = (element) => {
        const newElements = [...elements]

        newElements.push(element);

        setElements(newElements);
    }

    return (
        <>
            <div className="container">
                <Panel title="Фигуры" listElements={initData} handleForButton={handleClick} />
                <Canvas listElements={elements} />
            </div>
        </>
    )
}

export default Home;

