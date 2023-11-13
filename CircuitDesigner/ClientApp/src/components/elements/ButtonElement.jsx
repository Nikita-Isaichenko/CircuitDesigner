/**
 * Создает компонент с элементом внутри для панели элементов.
 * @param props.element Элемент для вставки в кнопку.
 * @param props.onClick Функция для обработки события onclick.
 * @returns HTML для ButtonElement.
 */
function ButtonElement({ element, onClick }) {

    /**
     * Обрабатывает событие ondragstart, устанавливая объект для drag'n'drop.
     */
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