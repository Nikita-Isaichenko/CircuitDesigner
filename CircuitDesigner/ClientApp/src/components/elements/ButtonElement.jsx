function ButtonElement({element, onClick}) {
    return (
        <>
            <button className="elementButton" onClick={() => onClick(element)}>
                {element}
            </button>
        </>
    )
}

export default ButtonElement;