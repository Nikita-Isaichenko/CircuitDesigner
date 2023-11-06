import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";

const initData = [
    <Resistor x='10' y='10' width='46' height='32' />,
    <Capacitor x='10' y='10' width='46' height='32' />,
    <InductionCoil x='10' y='10' width='46' height='32'/>
]

function Home(){

    const [elements, setElements] = useState([]);

    const handleClick = (element) => {
        console.log(elements)
        const newElements = [...elements]
        newElements.push(element);
        setElements(newElements);
    }

    return (
        <>
           
            <div className="container">
                <Panel title="Фигуры" listElements={initData} handleForButton={handleClick}/>
                <Canvas listElements={elements}/>              
            </div>
        </>
    )
}

export default Home;
    
