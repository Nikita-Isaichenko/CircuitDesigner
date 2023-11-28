/**
 * Создает компонент для списка страниц.
 * @returns Компонент со списком страниц.
 */
function PageList() {
    return (
        <div className="form-container">
                <form style={{paddingLeft: 10,}}>
                    <label>1 стр. </label>
                    <input className="radio-page" type="radio" name="page" />
                    <label>2 стр. </label>
                    <input className="radio-page" type="radio" name="page" />
                    <label>3 стр. </label>
                    <input className="radio-page" type="radio" name="page" />
                </form>
        </div>
    )
}

export default PageList;