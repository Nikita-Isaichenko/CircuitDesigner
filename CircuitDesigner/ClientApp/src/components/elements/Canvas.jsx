/**
 * Создает компонент, отвечающий за отрисовку элементов и взаимодействия с ними.
 * @returns Полотное с отрисованными элементами.
 */
function Canvas({ listElements, mouseDownHandler, mouseMoveHandler, mouseUpHandler, wheelHandler, settings }) {
    window.onload = () => {
        document.getElementById('svg').addEventListener('wheel', wheelHandler, { passive: false });

        const svg = document.getElementById('svg');

        svg.setAttribute('viewBox',
            `${settings.viewBox.x -= Math.floor(svg.clientWidth / 2)}
             ${settings.viewBox.y -= Math.floor(svg.clientHeight / 2)}
             ${svg.clientWidth}
             ${svg.clientHeight}`);
    };

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
                        <pattern id="grid" width={settings.sizeCell} height={settings.sizeCell} patternUnits="userSpaceOnUse">
                            <path d={`M ${settings.sizeCell} 0 L 0 0 0 ${settings.sizeCell}`}
                                fill="none"
                                stroke="lightgray"
                                stroke-width="1" />
                        </pattern>
                    </defs>
                    <rect fill="url(#grid)" width={settings.width} height={settings.height} />
                    {listElements.map(element =>
                        element
                    )}
                </svg>
            </div>
        </>
    )
}

export default Canvas;