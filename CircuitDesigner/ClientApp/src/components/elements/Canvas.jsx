/**
 * Создает компонент, отвечающий за отрисовку элементов и взаимодействия с ними.
 * @returns Полотное с отрисованными элементами.
 */
function Canvas({ listElements, mouseDownHandler, mouseMoveHandler, mouseUpHandler, wheelHandler, scale }) {

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('svg').addEventListener('wheel', wheelHandler, {passive: false});
        const svg = document.getElementById('svg');
        svg.setAttribute('viewBox', `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
    });

    return (
        <>
            <div className="canvas" id="canvas">
                <svg id='svg'
                    xmlns="http://www.w3.org/2000/svg"
                    width='100%'
                    height='100%'
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern id="grid" width={Math.floor(10 * scale)} height={Math.floor(10 * scale)} patternUnits="userSpaceOnUse">
                            <path d={`M ${Math.floor(10 * scale)} 0 L 0 0 0 ${Math.floor(10 * scale)}`} fill="none" stroke="lightgray" stroke-width="1" />
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