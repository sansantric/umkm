import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {mainReducer} from "./reducer";
const rootReducer = {
  mainReducer
};

const config = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};

const allReducers = combineReducers(rootReducer);
const persistedReducer = persistReducer(config, allReducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
