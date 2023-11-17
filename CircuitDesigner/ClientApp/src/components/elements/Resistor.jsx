/**
 * Создает компонент для резистора.
 * @param props.x X координата для svg.
 * @param props.y Y координата для svg.
 * @param props.width Ширина svg.
 * @param props.height Высота svg.
 * @returns Svg объект, представляющий резистор.
 */
function Resistor({x, y, width, height}) {
    return (
        <>
            <svg className="element" x={x} y={y} width={width} height={height} viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="150px" height="50px" fill="transparent"/>
                <path d="M0 25L150 25" stroke="black" strokeWidth="3" />
                <path d="M26.5 1.5H123.5V48.5H26.5V1.5Z" fill="#D9D9D9" stroke="black" strokeWidth="3" />
            </svg>
        </>
    )
}

export default Resistor;