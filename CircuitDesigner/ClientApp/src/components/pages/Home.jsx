import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";

function Home(){
    return (
        <>
           {/* <header><h1 className="title">Circuit Designer</h1></header> */}
            <div className="container">
                <Panel title="Фигуры"/>
                <Canvas/>
            </div>
        </>
    )
}

export default Home;

