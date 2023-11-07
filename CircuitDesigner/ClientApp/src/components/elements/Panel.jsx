import ButtonElement from "./ButtonElement";


function Panel(props) {

    const listElements = props.listElements.map((element, index) =>
        <ButtonElement key={index} element={element} onClick={props.handleForButton}></ButtonElement>
    )

    return (
        <div className="panel">
            <h1>{props.title}</h1>
            <div className="listElements">
                {listElements}
            </div>
        </div>
    )
}

export default Panel;