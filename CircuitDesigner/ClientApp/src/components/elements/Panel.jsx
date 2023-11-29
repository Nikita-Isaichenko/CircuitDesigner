/**
 * Создает компонент, который содержит в себе все элементы.
 * @param props.title Заголовок
 * @param props.listElements Список всех элементов.
 * @param props.handleForButton Функция обработчик клика для кнопки.
 * @returns Компонент, содержащий все элементы.
 */
function Panel({ title, listElements, handleForButton, mouseDownHandler, mouseMoveHandler, mouseUpHandler }) {
    return (
        <div
            className="panel"
            onMouseMove={mouseMoveHandler}
            onMouseUp={mouseUpHandler}>
            <h1>{title}</h1>
            <div className="listElements">
                {listElements.map((element, index) =>
                    <button
                        key={index}
                        className="elementButton"
                        onClick={() => handleForButton(element)}
                        onMouseDown={mouseDownHandler}
                    >
                        {element}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Panel;