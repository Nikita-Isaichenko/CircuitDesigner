import Resistor from "./Resistor";

function Canvas(props) {

    return (
        <div className="canvas">
            <svg width="100%" height="95%" color="white">
                <rect fill="white" width="100%" height="100%">
                    <g>
                    {props.listElements}
                    <div>
                    <Resistor width='100%' height='100%'></Resistor>
                    </div>
                    </g>                    
                </rect>
            </svg>
            <form action="">  
                    <label>1 стр.</label>                 
                    <input type="radio" name="page"/>
                    <label>2 стр.</label>  
                    <input type="radio" name="page"/>
                    <label>3 стр.</label>  
                    <input type="radio" name="page"/>               
            </form>
        </div>
    )
}

export default Canvas;