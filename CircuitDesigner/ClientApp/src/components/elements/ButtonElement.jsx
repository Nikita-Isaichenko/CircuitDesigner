function ButtonElement({ element, onClick }) {

    function dragStartHandler(event) {
        event.dataTransfer.setData('text/html', event.target.innerHTML);
    }

    return (
        <>
            <button className="elementButton"
                onClick={() => onClick(element)}
                draggable={true}
                onDragStart={dragStartHandler}>
                {element}
            </button>
        </>
    )
}

export default ButtonElement;