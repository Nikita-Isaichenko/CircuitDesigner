function Capacitor(props) {
    return (
        <>
            <svg className="element" x={props.x} y={props.y} width={props.width} height={props.height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="transparent"/>
                <line y1="25" x2="18" y2="25" stroke="black" strokeWidth="2" />
                <line x1="19.5" y1="50" x2="19.5" y2="1.3113e-06" stroke="black" strokeWidth="3" />
                <line x1="30.5" y1="50" x2="30.5" y2="1.3113e-06" stroke="black" strokeWidth="3" />
                <line x1="32" y1="25" x2="50" y2="25" stroke="black" strokeWidth="2" />
            </svg>
        </>
    )
}

export default Capacitor;