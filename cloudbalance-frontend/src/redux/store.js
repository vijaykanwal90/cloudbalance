import { createStore } from "redux";
import rootReducer from "./combine-reducers";
const store = createStore(rootReducer)

export default store;
