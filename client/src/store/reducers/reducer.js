// import uuid from 'uuid';
const INITIAL_STATE = {
    items: [],
    loading:false
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_ITEMS":
        return {
            ...state,
            items:action.payload,
            loading:false
        
        }
        case "ADD_ITEM":
        return {
            ...state,
          items:[action.payload,...state.items]
        }
        case "DELETE_ITEM":
        return {
          items:[...state.items.filter(i=> i._id!=action.payload)]
        }
        case "EDIT_ITEM":
        return {
            ...state
        //   items:[...state.items.filter(i=> i._id!=action.payload)]
        }
        case "ITEMS_LOADING":
        return {
            ...state,
            loading:true
         
        }
       default:
            return state;
    }

}