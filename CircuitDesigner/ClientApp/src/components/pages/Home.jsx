import Resistor from "../elements/Resistor"
import Capacitor from "../elements/Capacitor";
import InductionCoil from "../elements/InductionCoil";
import Panel from "../elements/Panel";
import Canvas from "../elements/Canvas";
import { useState } from "react";


const initData = [
    <Resistor x='10' y='10' width='46' height='32' />,
    <Capacitor x='10' y='10' width='150' height='50' />,
    <InductionCoil x='10' y='10' width='100' height='50'/>
]
//
// const initData = [
//     {id: 1, name: 'Capacitor', item: '<svg width="100" height="100" viewBox="0 0 50 50" fill="none">\n' +
//             '<line y1="25" x2="18" y2="25" stroke="black" stroke-width="2" />\n' +
//             '<line x1="19.5" y1="50" x2="19.5" y2="1.3113e-06" stroke="black" stroke-width="3" />\n' +
//             '<line x1="30.5" y1="50" x2="30.5" y2="1.3113e-06" stroke="black" stroke-width="3" />\n' +
//             '<line x1="32" y1="25" x2="50" y2="25" stroke="black" stroke-width="2" />\n' +
//             '</svg>'},
//     {id: 2, name: 'InductionCoil', item: '<svg width="100" height="100" viewBox="0 0 200 40" fill="none">\n' +
//             '<path d="M157 20C157 17.3736 156.483 14.7728 155.478 12.3463C154.472 9.91982 152.999 7.71504 151.142 5.85786C149.285 4.00069 147.08 2.5275 144.654 1.52241C142.227 0.517315 139.626 -1.14805e-07 137 0C134.374 1.14805e-07 131.773 0.517316 129.346 1.52241C126.92 2.5275 124.715 4.00069 122.858 5.85787C121.001 7.71504 119.528 9.91982 118.522 12.3463C117.517 14.7728 117 17.3736 117 20L120.019 20C120.019 17.77 120.458 15.5619 121.312 13.5016C122.165 11.4414 123.416 9.56942 124.993 7.99258C126.569 6.41574 128.441 5.16492 130.502 4.31155C132.562 3.45817 134.77 3.01894 137 3.01894C139.23 3.01894 141.438 3.45817 143.498 4.31155C145.559 5.16492 147.431 6.41574 149.007 7.99258C150.584 9.56941 151.835 11.4414 152.688 13.5016C153.542 15.5619 153.981 17.77 153.981 20H157Z" stroke="black" stroke-width="3" fill="black" />\n' +
//             '<path d="M120 20C120 17.3736 119.483 14.7728 118.478 12.3463C117.472 9.91982 115.999 7.71504 114.142 5.85786C112.285 4.00069 110.08 2.5275 107.654 1.52241C105.227 0.517315 102.626 -1.14805e-07 100 0C97.3736 1.14805e-07 94.7728 0.517316 92.3463 1.52241C89.9198 2.5275 87.715 4.00069 85.8579 5.85787C84.0007 7.71504 82.5275 9.91982 81.5224 12.3463C80.5173 14.7728 80 17.3736 80 20L83.013 20C83.013 17.7692 83.4524 15.5603 84.3061 13.4994C85.1598 11.4384 86.411 9.56579 87.9884 7.98841C89.5658 6.41102 91.4384 5.15977 93.4994 4.3061C95.5603 3.45242 97.7692 3.01304 100 3.01304C102.231 3.01304 104.44 3.45242 106.501 4.3061C108.562 5.15977 110.434 6.41102 112.012 7.98841C113.589 9.56579 114.84 11.4384 115.694 13.4994C116.548 15.5603 116.987 17.7692 116.987 20H120Z" stroke="black" stroke-width="3" fill="black" />\n' +
//             '<path d="M83 20C83 17.3736 82.4827 14.7728 81.4776 12.3463C80.4725 9.91982 78.9993 7.71504 77.1421 5.85786C75.285 4.00069 73.0802 2.5275 70.6537 1.52241C68.2272 0.517315 65.6264 -1.14805e-07 63 0C60.3736 1.14805e-07 57.7728 0.517316 55.3463 1.52241C52.9198 2.5275 50.715 4.00069 48.8579 5.85787C47.0007 7.71504 45.5275 9.91982 44.5224 12.3463C43.5173 14.7728 43 17.3736 43 20L46.0203 20C46.0203 17.7702 46.4595 15.5622 47.3128 13.5021C48.1661 11.4421 49.4168 9.57024 50.9935 7.99353C52.5702 6.41682 54.4421 5.1661 56.5021 4.31279C58.5622 3.45948 60.7702 3.02028 63 3.02028C65.2298 3.02028 67.4378 3.45948 69.4979 4.31279C71.5579 5.1661 73.4298 6.41682 75.0065 7.99353C76.5832 9.57024 77.8339 11.4421 78.6872 13.5021C79.5405 15.5622 79.9797 17.7702 79.9797 20H83Z" stroke="black" stroke-width="3" fill="black" />\n' +
//             '<line x1="46" y1="18.5" y2="18.5" stroke="black" stroke-width="5" />\n' +
//             '<line x1="154" y1="18.5" x2="200" y2="18.5" stroke="black" stroke-width="5" />\n' +
//             '</svg>'},
//     {id: 2, name: 'Capacitor', item: '<svg width="100" height="100" viewBox="0 0 150 50" fill="none">\n' +
//             '<path d="M0 25L150 25" stroke="black" stroke-width="3" />\n' +
//             '<path d="M26.5 1.5H123.5V48.5H26.5V1.5Z" fill="#D9D9D9" stroke="black" stroke-width="3" />\n' +
//             '</svg>'}
// ]

function Home(){

    const [elements, setElements] = useState([]);

    const handleClick = (element) => {
        console.log(elements)
        const newElements = [...elements]
        newElements.push(element);
        setElements(newElements);
    }

    return (
        <>  
            <div className="container">
                <Panel title="Фигуры" listElements={initData} handleForButton={handleClick}/>
                <Canvas listElements={elements}/>
            </div>
        </>
    )
}

export default Home;
    
