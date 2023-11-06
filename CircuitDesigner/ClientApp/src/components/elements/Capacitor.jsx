function Capacitor(props) {
    return (
        <>
            <svg x={props.x} y={props.y} width={props.width} height={props.height} viewBox="0 0 50 50" fill="none">
                <line y1="25" x2="18" y2="25" stroke="black" stroke-width="2" />
                <line x1="19.5" y1="50" x2="19.5" y2="1.3113e-06" stroke="black" stroke-width="3" />
                <line x1="30.5" y1="50" x2="30.5" y2="1.3113e-06" stroke="black" stroke-width="3" />
                <line x1="32" y1="25" x2="50" y2="25" stroke="black" stroke-width="2" />
            </svg>
        </>
    )
}

export default Capacitor;