import axios from 'axios';
// import { UserAgentApplication, AuthError, AuthResponse } from "msal";

const SET_REPORT_GROUPS = 'SET_REPORT_GROUPS';
const SET_REPORTS = 'SET_REPORTS';
const SET_AUTH = 'SET_AUTH';
const REMOVE_AUTH = 'REMOVE_AUTH';

const initial = {
    isAdmin: false,
    reportGroups: null,
    reports: null,
    token: null,
}

export const setUserGroup = () => async (dispatch) => {
    const result = await axios.post('http://127.0.0.1:8000/api/user/group/set', {
        // name: 'Новая группа',
        // description: 'Группа для теста'
    })
    console.log(result);
}

export const setUsersIntoGroup = () => async (dispatch) => {
    const result = await axios.post('http://127.0.0.1:8000/api/user/group/fill', {
        // group: 1,
        // users: [1,2]
    })
    console.log(result);
}

export const setReportsIntoGroup = (group, reports) => async (dispatch) => {
    const result = await axios.post('http://127.0.0.1:8000/api/report/group/fill', {
        group,
        reports
    })
    console.log(result);
}

export const getToken = () => async (dispatch) => {
    const result = await axios.get('http://127.0.0.1:8000/api/api/token');
    console.log(result);
}

export const getUserReportGroups = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/report/user/get');
        dispatch({type: SET_REPORT_GROUPS, data: result.data});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const auth = () => async (dispatch) => {
    try {
        //get id from bitrix
        const id = 1;
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa('jXOJqUHSTK:j1P81OaeLF:'+id);
        const result = await axios.get('http://127.0.0.1:8000/api/token/get');
        dispatch({type: SET_AUTH, data: result.data});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getReportGroups = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/report/group/get');
        dispatch({type: SET_REPORT_GROUPS, data: result.data});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getReports = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/report/get');
        dispatch({type: SET_REPORTS, data: result.data});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
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
        case SET_REPORT_GROUPS: 
            return {
                ...state,
                reportGroups: action.data
            }
        case SET_REPORTS: 
            return {
                ...state,
                reports: action.data
            }
        case SET_AUTH: 
            return {
                ...state,
                token: action.data.token,
                isAdmin: action.data.isAdmin
            }
        case REMOVE_AUTH: 
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    }
}