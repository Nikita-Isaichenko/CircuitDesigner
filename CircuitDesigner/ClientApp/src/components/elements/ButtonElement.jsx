function ButtonElement(props) {
    return (      
        <>
            <button className="element" onClick={() => props.onClick(props.element)}>
                {props.element}      
                {/* <div>{props.name}</div>         */}
            </button>
        </>
    )
}

export default ButtonElement;