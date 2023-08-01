import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import limbahReducer from "./limbahReducer";
import peringatanReducer from "./peringatanReducer";

const reducer = combineReducers({
  loginReducer,
  limbahReducer,
  peringatanReducer,
});

export default reducer;
