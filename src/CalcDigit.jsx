import { CALC_ACTIONS } from "./calculatorReducer";

const DigitBtn = ({ num, dispatch, id }) => {
  return (
    <span
      id={id ?? ""}
      onClick={() => dispatch({ type: CALC_ACTIONS.ADD_DIGIT, payload: num })}
    >
      <i>{num}</i>
    </span>
  );
};

export default DigitBtn;
