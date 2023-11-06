function Canvas(props) {
    const list = props.listElements.map(item => <g>{item}</g>);


    

    return (
        <div className="canvas">
            <svg id='svg' width="100%" height="95%">
                <rect fill="white" width="100%" height="100%"/>
                {list}                          
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