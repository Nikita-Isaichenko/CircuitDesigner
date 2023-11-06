function ButtonElement(props) {
    return (      
        <>
            <button className="element" onClick={() => props.onClick(props.element)}>
                
                {props.element} 
                     
            </button>
        </>
    )
}

export default ButtonElement;