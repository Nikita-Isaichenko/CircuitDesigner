function Canvas() {
    return (
        <div className="canvas">
            <svg width="100%" height="95%" color="white">
                <rect fill="white" width="100%" height="100%">

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