import ListCircuitElement from "./ListCircuitElement";

function Panel(props) {
    return (
        <div className="panel">
            <h1>{props.title}</h1>
            <ListCircuitElement />
        </div>
    )
}

export default Panel;