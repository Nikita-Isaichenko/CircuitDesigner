/**
 * Создает компонент, отвечающий за отрисовку элементов и взаимодействия с ними.
 * @returns Полотное с отрисованными элементами.
 */
function Canvas({ listElements, mouseDownHandler, mouseMoveHandler, mouseUpHandler, wheelHandler }) {
    return (
        <>
            <div className="canvas" id="canvas">
                <svg id='svg'
                    xmlns="http://www.w3.org/2000/svg"
                    width="2000px"
                    height="2000px"
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    onWheel={wheelHandler}
                >
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="lightgray" stroke-width="1" />
                        </pattern>
                    </defs>
                    <rect fill="url(#grid)" width="100%" height="100%" />
                    {listElements.map(element =>
                        element
                    )}

                </svg>
            </div>
        </>
    )
}

export default Canvas;