export default function reducer(state={
  index: -1,
  name: null,
}, action) {
  switch (action.type) {
    case "SET_INDEX":
      return {...state, index: action.payload}
    case "SET_NAME":
      return {...state, name: action.payload}
    case "SET_COMMUNITY":
      var {name, index} = action.payload
      return {...state, name, index}  
    default:
      return state

  }
}
