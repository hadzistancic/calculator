export const INITIAL_STATE = {
  currentOperant: null,
  computation: null,
  lastOperator: null,
};

export const CALC_ACTIONS = {
  ADD_DIGIT: "add_digit",
  OPERATION: "operation",
  CLEAR: "clear",
  RESULT: "result",
};

export const calcReducer = (state, action) => {
  switch (action.type) {
    case CALC_ACTIONS.ADD_DIGIT:
      //reset if digit typed after computation
      if (state.computed) {
        return {
          ...state,
          currentOperant: action.payload,
          computation: action.payload,
          computed: false,
        };
      }
      //preventing typing multiple zeros
      if (state.currentOperant === null && action.payload === "0") {
        return state;
      }
      //initial decimale value
      if (state.currentOperant === null && action.payload === ".") {
        return {
          ...state,
          currentOperant: "0.",
          computation: "0.`",
        };
      }
      //preventing multiple dots in decimale value
      if (action.payload === "." && state.currentOperant?.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperant: `${state.currentOperant || ""}${action.payload}`,
        computation: `${state.computation || ""}${action.payload}`,
      };

    case CALC_ACTIONS.OPERATION:
      //continue computation with last computed result
      if (state.computed) {
        return {
          ...state,
          currentOperant: null,
          computation: state.currentOperant + action.payload,
          lastOperator: action.payload,
          computed: false,
        };
      }
      //egde case with multiple operators
      if (
        state.currentOperant === "-" &&
        state.computation &&
        state.lastOperator === "-"
      ) {
        return {
          ...state,
          computation: state.computation.slice(0, -2) + action.payload,
          lastOperator: action.payload,
          currentOperant: null,
        };
      }
      //must enter a digit for negative value
      if (state.currentOperant === "-") {
        return state;
      }
      //converts double - to +
      if (
        state.currentOperant === null &&
        state.computation &&
        action.payload === "-" &&
        state.lastOperator === "-"
      ) {
        return {
          ...state,
          computation: state.computation.slice(0, -1) + "+",
          lastOperator: "+",
        };
      }
      //for entering negative values
      if (action.payload === "-" && state.currentOperant === null) {
        return {
          ...state,
          currentOperant: "-",
          computation: `${state.computation || ""}${action.payload}`,
          lastOperator: action.payload,
        };
      }

      //prevents typing double -
      if (action.payload === "-" && state.currentOperant === "-") {
        return state;
      }
      //alowing to change operation
      if (state.currentOperant === null && state.computation) {
        return {
          ...state,
          computation: state.computation.slice(0, -1) + action.payload,
          lastOperator: action.payload,
        };
      }

      //preventing to select operation before initial value
      if (state.currentOperant === null) {
        return state;
      }
      //default behaviour
      return {
        ...state,
        currentOperant: null,
        computation: `${state.computation || ""}${action.payload}`,
        lastOperator: action.payload,
      };

    case CALC_ACTIONS.CLEAR:
      return INITIAL_STATE;

    case CALC_ACTIONS.RESULT:
      if (state.computation === null || state.computed) {
        return state;
      }
      if (state.computation && state.currentOperant === null) {
        return {
          ...state,
          computation:
            `${state.computation.slice(0, -1)}=` +
            eval(state.computation.slice(0, -1)),
          currentOperant: eval(state.computation.slice(0, -1)),
          computed: true,
        };
      }
      return {
        ...state,
        computation: `${state.computation}=` + eval(state.computation),
        currentOperant: eval(state.computation),
        computed: true,
      };
  }
};
