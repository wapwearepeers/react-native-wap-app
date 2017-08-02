export function setCommunity(community) {
  return {
    type: "SET_COMMUNITY",
    payload: community
  }
}

export function setCommunityIndex(index) {
  return {
    type: "SET_INDEX",
    payload: index
  }
}

export function setCommunityName(name) {
  return {
    type: "SET_NAME",
    payload: name
  }
}
