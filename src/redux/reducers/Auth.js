import {REDUX_SETUP,CONTACT_LIST,CONTACT_USER_DETAILS,ADD_FAVOURITE,REMOVE_FAVOURITE} from 'redux/Types';

const initial_state={
    redux_setup:false,
    contact_list_data:{},
    contact_user_details:{},
    favourite_list:[]
}

export default (state=initial_state,action)=>{
    switch(action.type){
        case REDUX_SETUP: return{
            ...state,
            redux_setup:action.payload
        };
        case CONTACT_LIST: return{
            ...state,
            contact_list_data:action.payload
        };
        case CONTACT_USER_DETAILS: return{
            ...state,
            contact_user_details:action.payload
        };
        case ADD_FAVOURITE: return{
            ...state,
            favourite_list:[...state.favourite_list,action.payload]
        };
        case REMOVE_FAVOURITE: return{
            ...state,
            favourite_list:action.payload
        };
        default:
			return state;
    }
}