import ButtonElement from "./ButtonElement";


/**
 * Создает компонент, который содержит в себе все элементы.
 * @param props.title Заголовок
 * @param props.listElements Список всех элементов.
 * @param props.handleForButton Функция обработчик клика для кнопки.
 * @returns Компонент, содержащий все элементы.
 */
function Panel({title, listElements, handleForButton}) {
    return (
        <div className="panel">
            <h1>{title}</h1>
            <div className="listElements">
                {listElements.map((element, index) => 
                    <ButtonElement key={index} element={element} onClick={handleForButton}></ButtonElement>
                )}
            </div>
        </div>
    )
}

export default Panel;