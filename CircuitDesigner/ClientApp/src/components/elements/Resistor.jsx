
function Resistor(props) {
    return (
            <svg x={props.x} y={props.y} width={props.width} height={props.height} viewBox="0 0 150 50" fill="none">
                <path d="M0 25L150 25" stroke="black" stroke-width="3" />
                <path d="M26.5 1.5H123.5V48.5H26.5V1.5Z" fill="#D9D9D9" stroke="black" stroke-width="3" />
            </svg>
    )
}

export default Resistor;