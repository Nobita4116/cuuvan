const initialState = {
    profile: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_PROFILE': 
        return {
          ...state,
          profile: action.data
        }
    default:
      return state;
  }
}