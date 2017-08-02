import { applyMiddleware, createStore } from "redux"

import { createLogger } from "redux-logger"

import reducer from "./reducers"

const middleware = applyMiddleware(createLogger())

export default createStore(reducer, middleware)
