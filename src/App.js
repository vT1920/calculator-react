import {useState, useEffect } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [input,setInput] =useState("0");
  const [prestate, setPrestate] = useState("");
  const [curstate, setCurstate] = useState("");
  const [operator, setOperator] = useState("null");
  const [total, setTotal] = useState(false);

  const inputNum = (e) =>{
    // It allows you to input dot only once
    if(curstate.includes(".") && e.target.innerText === ".") return;

    if(total){
      setPrestate("");
    }

    curstate ? setCurstate((pre) => pre + e.target.innerText) : setCurstate(e.target.innerText);

    setTotal(false);
  }
  // When the app loads we set the input to 0
 useEffect(() => {
   setInput("0");
 }, []);

  // Anytime the current state changes set input to current state
useEffect(() => {
  setInput(curstate);
}, [curstate]);

const reset = () => {
  setPrestate("");
  setCurstate("");
  setInput("0");
};



const operatorType = (e) => {
  setTotal(false);
  setOperator(e.target.innerText);

  if(curstate === "") return;
  if(prestate !== "") {
    equals();
  } else {
    setPrestate(curstate);
    setCurstate("");
  }

};
const equals = (e) => {
  if(e?.target.innerText === "="){
    setTotal(true);
  }

  let calculation, div, mul;

  switch(operator) {
    case "/":
      div = parseFloat(prestate) / parseFloat(curstate);
      // Checking to see if the calulation has decmial places
      if (div % 1 !== 0){
        calculation = div.toFixed(3);
      }
      else{
        calculation = String(div);
      }
      break;
    case "x":
      mul = parseFloat(prestate) * parseFloat(curstate);

      if (mul % 1 !== 0){
        calculation = mul.toFixed(3);
      }
      else{
        calculation = String(mul);
      }
      break;
    case "+":
      calculation = String(parseFloat(prestate) + parseFloat(curstate));
      break;
    case "-":
      calculation = String(parseFloat(prestate) - parseFloat(curstate));
      break;
    default:
      return;
  }
  setInput("");
  setPrestate(calculation);
  setCurstate("");
}

  return (
    <div class="calculator card">
    {/* <input type="text" class="calculator-screen" value="" /> */}
    <div class="calculator-screen">{input !== "" || input === 0 ?(
      <NumberFormat
        value={input}
        displayType={"text"}
        thousandSeparator={true}
      />

    ) : (
      <NumberFormat
        value={prestate}
        displayType={"text"}
        thousandSeparator = {true}
      />
    )}</div>

    <div class="calculator-keys">
        <button type="button" class="operator btn btn-info" onClick={operatorType}>+</button>
        <button type="button" class="operator btn btn-info" onClick={operatorType}>-</button>
        <button type="button" class="operator btn btn-info" onClick={operatorType}>x</button>
        <button type="button" class="operator btn btn-info" onClick={operatorType}>/</button>

        <button type="button"  class="btn btn-light" onClick={inputNum}>7</button>
        <button type="button"  class="btn btn-light" onClick={inputNum}>8</button>
        <button type="button"  class="btn btn-light" onClick={inputNum}>9</button>

        <button type="button" value="4" class="btn btn-light" onClick={inputNum}>4</button>
        <button type="button" value="5" class="btn btn-light" onClick={inputNum}>5</button>
        <button type="button" value="6" class="btn btn-light" onClick={inputNum}>6</button>

        <button type="button" value="1" class="btn btn-light" onClick={inputNum}>1</button>
        <button type="button" value="2" class="btn btn-light" onClick={inputNum}>2</button>
        <button type="button" value="3" class="btn btn-light" onClick={inputNum}>3</button>

        <button type="button" value="0" class="btn btn-light" onClick={inputNum}>0</button>
        <button type="button" value="." class="btn btn-secondary" onClick={inputNum}>.</button>
        <button type="button" class="btn btn-danger btn-sm"onClick={reset}>AC</button>

        <button type="button"  class="equal-sign btn btn-light"onClick={equals}>=</button>


    </div>

</div>  );
}

export default App;