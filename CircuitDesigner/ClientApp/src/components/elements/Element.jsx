import resistor from "./img/resistor.svg"

function Element(props) {
    return (      
        <>
            <button className="element">
                <img src={resistor} alt="" width="36" height="36"/>
                <div>{props.name}</div>
            </button>
        </>    
    )
}

export default Element;