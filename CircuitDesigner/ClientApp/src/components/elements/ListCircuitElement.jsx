import ButtonElement from "./ButtonElement";
import Resistor from "./Resistor";
import Capacitor from "./Capacitor";
import InductionCoil from "./InductionCoil";

const items = ["Резистор", "Конденсатор", "Катушка индуктивности"]
const elements = [<Resistor width='46' height='32'/>, <Capacitor width='46' height='32'/>, <InductionCoil width='46' height='32'/>]

function ListCircuitElement() {
    const listItems = elements.map((item, index) =>
        <ButtonElement name={items[index]} element={item}></ButtonElement>
        )

    return (
        <>
            <div className="listElements">
                {listItems}
            </div>
        </>
    )
}



export default ListCircuitElement;