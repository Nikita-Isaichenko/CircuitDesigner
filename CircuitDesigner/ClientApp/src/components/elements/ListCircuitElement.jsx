import Element from "./Element";

const items = ["Резистор", "Катушка индуктивности", "Конденсатор",]

function ListCircuitElement() {
    const listItems = items.map(item =>
        <Element name={item}></Element>
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