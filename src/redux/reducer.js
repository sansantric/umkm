const initialState = {
  miniSidenav: false,
  transparentSidenav: false,
  sidenavColor: "info",
  transparentNavbar: false,
  fixedNavbar: true,
  openConfigurator: false,
  direction: "ltr",
  layout: "dashboard",
  isLoggin: false,
  isSignUp: false,
  isLoading: false,
  isAlert: false,
  isModal: false,
  ModalConfirm: false,
  status: "",
  message: "",
  login: false,
  user: false,
  cart: [],
  modalType: "",
  riwayat: "",
  image: "",
  post: {
    investasi: [],
    bisnis: [],
    history: [],
  },
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "ISLOGIN": {
      return { ...state, isLoggin: action.value };
    }
    case "SIGNUP": {
      return { ...state, isSignUp: action.value };
    }
    case "LOADING": {
      return { ...state, isLoading: action.value };
    }
    case "ALERT": {
      return { ...state, isAlert: action.value };
    }
    case "MODAL": {
      return { ...state, isModal: action.value };
    }
    case "MODAL_CONFIRM": {
      return { ...state, ModalConfirm: action.value };
    }
    case "STATUS": {
      return { ...state, status: action.value };
    }
    case "MESSAGE": {
      return { ...state, message: action.value };
    }
    case "LOGIN": {
      return { ...state, login: action.value };
    }
    case "USER": {
      return { ...state, user: action.value };
    }
    case "CART": {
      return { ...state, cart: [...state.cart, action.value] };
    }
    case "DELETE_CART": {
      let filteredArray = state.cart.filter(function(e) { return e !== action.value })
      console.log("DELETE_CART",filteredArray)
      return { ...state, cart: filteredArray };
    }
    case "MODALTYPE": {
      return { ...state, modalType: action.value };
    }
    case "RIWAYAT": {
      return { ...state, riwayat: action.value };
    }
    case "IMAGE": {
      return { ...state, image: action.value };
    }
    case "RESET_CART": {
      return { ...state, cart: [] };
    }
    case "POST": {
      let bisnis = [];
      let investasi = [];
      action.value.map((items, i) => {
        return items.kategori == "bisnis" ? bisnis.push(items) : investasi.push(items);
      });
      return {
        ...state,
        post: {
          ...state.post,
          investasi: investasi,
          bisnis: bisnis,
        },
      };
    }
    case "POST_HISTORY": {
      return {
        ...state,
        post: {
          ...state.post,
          history: action.value,
        },
      };
    }
    case "RESET": {
      return { initialState };
    }
    default:
      return state; // return default state
  }
};
