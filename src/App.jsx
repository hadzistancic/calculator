import { useReducer } from "react";
import { CALC_ACTIONS, calcReducer, INITIAL_STATE } from "./calculatorReducer";
import DigitBtn from "./CalcDigit";
import OperationBtn from "./CalcOperation";
import "./App.scss";

function App() {
  const [state, dispatch] = useReducer(calcReducer, INITIAL_STATE);
  return (
    <div className="container">
      <form action="" name="calc" className="calculator">
        <div className="value">
          <p>{state.computation}</p>
          <p id="display">{state.currentOperant ?? "0"}</p>
        </div>

        <span
          id="clear"
          className="num clear"
          onClick={() => dispatch({ type: CALC_ACTIONS.CLEAR })}
        >
          <i>C</i>
        </span>

        <OperationBtn operation="/" id="divide" dispatch={dispatch} />

        <OperationBtn operation="*" id="multiply" dispatch={dispatch} />

        <DigitBtn num="7" id="seven" dispatch={dispatch} />
        <DigitBtn num="8" id="eight" dispatch={dispatch} />

        <DigitBtn num="9" id="nine" dispatch={dispatch} />

        <OperationBtn operation="-" id="subtract" dispatch={dispatch} />

        <DigitBtn num="4" id="four" dispatch={dispatch} />
        <DigitBtn num="5" id="five" dispatch={dispatch} />
        <DigitBtn num="6" id="six" dispatch={dispatch} />

        <OperationBtn operation="+" id="add" dispatch={dispatch} />

        <DigitBtn num="1" id="one" dispatch={dispatch} />
        <DigitBtn num="2" id="two" dispatch={dispatch} />
        <DigitBtn num="3" id="three" dispatch={dispatch} />
        <DigitBtn num="0" id="zero" dispatch={dispatch} />

        <DigitBtn num="." id="decimal" dispatch={dispatch} />

        <span
          id="equals"
          className="equal"
          onClick={() => dispatch({ type: CALC_ACTIONS.RESULT })}
        >
          <i>=</i>
        </span>
      </form>
    </div>
  );
}

export default App;
