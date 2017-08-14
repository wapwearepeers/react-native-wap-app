export function setCommunity(community) {
  return {
    type: "SET_COMMUNITY",
    payload: community
  }
}

export function setCommunityId(id) {
  return {
    type: "SET_COMMUNITY_ID",
    payload: id
  }
}

export function setCommunityName(name) {
  return {
    type: "SET_COMMUNITY_NAME",
    payload: name
  }
}

export function setCommunityCanAddPlaces(canAddPlaces) {
  return {
    type: "SET_COMMUNITY_CAN_ADD_PLACES",
    payload: canAddPlaces
  }
}
