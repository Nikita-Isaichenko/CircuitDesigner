const items = ["Резистор", "Катушка индуктивности", "Конденсатор",]

function ListCircuitElement() {
    const listItems = items.map(item =>
        <button className="element">
            {item}
        </button>
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