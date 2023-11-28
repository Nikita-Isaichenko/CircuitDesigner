/**
 * Создает компонент с элементом внутри для панели элементов.
 * @param props.element Элемент для вставки в кнопку.
 * @param props.onClick Функция для обработки события onclick.
 * @returns HTML для ButtonElement.
 */
function ButtonElement({ element, onClick }) {
    return (
        <>
            <button className="elementButton"
                onClick={() => onClick(element)}
                draggable={true}
                // onDragStart={dragStartHandler}
                // onDragOver={dragOverHandler}
            >
                {element}
            </button>
        </>
    )
}

export default ButtonElement;