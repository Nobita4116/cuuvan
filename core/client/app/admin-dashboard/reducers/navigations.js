const initialState = {
    listMenu: [],
    menuActive: [],
    currentApp: ''
}

export default function navigations(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_MENU_CLICK':
        return {
            ...state,
            menuActive: action.data
        }
    case 'ADD_MENU':
        return {
            ...state,
            listMenu: [...state.listMenu, action.data]
        }
    case 'CHANGE_MENU':
        return {
            ...state,
            menuActive: action.data
        }
    default:
      return state;
  }
}