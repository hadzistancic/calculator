import { CALC_ACTIONS } from "./calculatorReducer";

const OperationBtn = ({ operation, dispatch, id }) => {
  return (
    <span
      id={id ?? ""}
      className={operation === "+" ? "plus" : null}
      onClick={() =>
        dispatch({ type: CALC_ACTIONS.OPERATION, payload: operation })
      }
    >
      <i>{operation}</i>
    </span>
  );
};

export default OperationBtn;
