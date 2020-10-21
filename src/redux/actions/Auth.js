import {REDUX_SETUP,CONTACT_LIST,CONTACT_USER_DETAILS,ADD_FAVOURITE,REMOVE_FAVOURITE} from 'redux/Types'
import {axiosNoAuth,axiosAuth} from 'config/axios-instances';
import {API_BASE_URL} from "config/config";

export function reduxSetup(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:REDUX_SETUP,
                payload:true
            })
            successCallBack && successCallBack()
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}


export function contactListHandler(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            let response = await axiosNoAuth.get(API_BASE_URL+"/api/users");
            // console.log("contactListHandler ",response);
            await dispatch({
                type:CONTACT_LIST,
                payload:response.data
            })
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function contactDetailsHandler(id,successCallBack,errorCallBack){
    
    return async function(dispatch){
        try{
            let response = await axiosNoAuth.get(API_BASE_URL+`/api/users/${id}`);
            await dispatch({
                type:CONTACT_USER_DETAILS,
                payload:response.data.data
            })
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function addFavouriteHandler(value,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:ADD_FAVOURITE,
                payload:value
            })
            successCallBack && successCallBack()
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function removeFavouriteHandler(value,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:REMOVE_FAVOURITE,
                payload:value
            })
            successCallBack && successCallBack()
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}