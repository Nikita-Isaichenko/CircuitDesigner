import ButtonElement from "./ButtonElement";


function Panel(props) {
    return (
        <div className="panel">
            <h1>{props.title}</h1>
            <div className="listElements">
                {props.listElements.map((element, index) => 
                    <ButtonElement key={index} element={element} onClick={props.handleForButton}></ButtonElement>
                )}
            </div>
        </div>
    )
}

export default Panel;