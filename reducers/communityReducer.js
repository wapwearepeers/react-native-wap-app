export default function reducer(state={
  id: -1,
  name: null,
  canAddPlaces: false,
}, action) {
  switch (action.type) {
    case "SET_COMMUNITY_ID":
      return {...state, id: action.payload}
    case "SET_COMMUNITY_NAME":
      return {...state, name: action.payload}
    case "SET_COMMUNITY":
      var {name, id} = action.payload
      return {...state, name, id}
    case "SET_COMMUNITY_CAN_ADD_PLACES":
      return {...state, canAddPlaces: action.payload}
    default:
      return state

  }
}
