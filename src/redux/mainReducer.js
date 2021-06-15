import axios from 'axios';
// import { UserAgentApplication, AuthError, AuthResponse } from "msal";

axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa('jXOJqUHSTK:j1P81OaeLF');

const initial = {
    isAdmin: true
}

export const setUserGroup = () => async (dispatch) => {
    const result = await axios.post('http://127.0.0.1:8000/user/group/set', {
        // name: 'Новая группа',
        // description: 'Группа для теста'
    })
    console.log(result);
}

export const setUsersIntoGroup = () => async (dispatch) => {
    const result = await axios.post('http://127.0.0.1:8000/user/group/fill', {
        // group: 1,
        // users: [1,2]
    })
    console.log(result);
}

export const getToken = () => async (dispatch) => {
    const result = await axios.get('http://127.0.0.1:8000/api/token');
    console.log(result);
}

const getFormDataFromObject = (data) => {
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return formData;
}

export const mainReducer = (state = initial, action) => {
    switch(action.type) {

        default:
            return state;
    }
}