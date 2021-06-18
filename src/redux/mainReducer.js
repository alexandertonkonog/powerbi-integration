import axios from 'axios';
// import { UserAgentApplication, AuthError, AuthResponse } from "msal";

const SET_REPORT_GROUPS = 'SET_REPORT_GROUPS';
const SET_REPORTS = 'SET_REPORTS';
const SET_USERS = 'SET_USERS';
const SET_USER_GROUPS = 'SET_USER_GROUPS';
const SET_AUTH = 'SET_AUTH';
const SET_SETTINGS = 'SET_SETTINGS';
const REMOVE_AUTH = 'REMOVE_AUTH';

const initial = {
    isAdmin: false,
    reportGroups: null,
    reports: null,
    users: null,
    token: null,
    userGroups: null,
    settings: null,
}

export const setGroup = (options) => async (dispatch) => {
    let url, disType;
    if (options.type === 'report') {
        url = '/api/report/group/set';
        disType = SET_REPORT_GROUPS;
    } else if (options.type === 'userGroup') {
        url = '/api/user/group/set';
        disType = SET_USER_GROUPS;
    }
    if (url) {
        try {
            const result = await axios.post('http://127.0.0.1:8000' + url, options);
            dispatch({type: disType, data: result.data});
            return {success: true};
        } catch (e) {
            return {success: false};
        }
    }     
}

export const setEntitiesIntoGroup = (group, entities, type) => async (dispatch) => {
    let url, disType;
    if (type === 'report') {
        url = '/api/report/group/fill';
        disType = SET_REPORT_GROUPS;
    } else if (type === 'userGroup') {
        url = '/api/user/group/fill';
        disType = SET_USER_GROUPS;
    } else if (type === 'user') {
        url = '/api/user/fill';
        disType = SET_USERS;
    } else if (type === 'userUserGroup') {
        url = '/api/group/user/fill';
        disType = SET_USER_GROUPS;
    }
    try {
        const result = await axios.post('http://127.0.0.1:8000' + url, {
            group,
            entities
        })
        dispatch({type: disType, data: result.data});
        return {success: true};
    } catch (e) {
        return {success: false};
    }
}

export const removeEntitiesFromGroup = (group, entities, type) => async (dispatch) => {
    let url, disType;
    if (type === 'report') {
        url = '/api/report/group/empty';
        disType = SET_REPORT_GROUPS;
    } else if (type === 'user') {
        url = '/api/user/empty';
        disType = SET_USERS;
    } else if (type === 'userGroup') {
        url = '/api/user/group/empty';
        disType = SET_USER_GROUPS;
    } else if (type === 'userUserGroup') {
        url = '/api/group/user/empty';
        disType = SET_USER_GROUPS;
    }
    if (url) {
        try {
            const result = await axios.post('http://127.0.0.1:8000' + url, {
                group,
                entities
            })
            dispatch({type: disType, data: result.data});
            return {success: true};
        } catch (e) {
            return {success: false};
        }
    }
}

export const removeGroups = (groups, type) => async (dispatch) => {
    let url, disType;
    if (type === 'report') {
        url = '/api/report/group/remove';
        disType = SET_REPORT_GROUPS;
    } else if (type === 'userGroup') {
        url = '/api/user/group/remove';
        disType = SET_USER_GROUPS;
    }
    if (url) {
        try {
            const result = await axios.post('http://127.0.0.1:8000' + url, {
                groups
            })
            dispatch({type: disType, data: result.data});
            return {success: true};
        } catch (e) {
            return {success: false};
        }
    }
}

export const getToken = () => async (dispatch) => {
    const result = await axios.get('http://127.0.0.1:8000/api/api/token');
    console.log(result);
}

export const getUserReportGroups = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/report/user/get');
        dispatch({type: SET_REPORT_GROUPS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const auth = () => async (dispatch) => {
    try {
        //get id from bitrix
        const id = 1;
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa('jXOJqUHSTK:j1P81OaeLF:'+id);
        const result = await axios.get('http://127.0.0.1:8000/api/token/get');
        dispatch({type: SET_AUTH, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getReportGroups = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/report/group/get');
        dispatch({type: SET_REPORT_GROUPS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getReports = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/report/get');
        dispatch({type: SET_REPORTS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/user/get');
        dispatch({type: SET_USERS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getUserGroups = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/user/group/get');
        dispatch({type: SET_USER_GROUPS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getSettings = () => async (dispatch) => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/settings/get');
        dispatch({type: SET_SETTINGS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const setSettings = (body) => async (dispatch) => {
    try {
        const result = await axios.post('http://127.0.0.1:8000/api/settings/set', body);
        dispatch({type: SET_SETTINGS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
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
        case SET_USER_GROUPS: 
            return {
                ...state,
                userGroups: action.data
            }
        case SET_REPORTS: 
            return {
                ...state,
                reports: action.data
            }
        case SET_USERS: 
            return {
                ...state,
                users: action.data
            }
        case SET_AUTH: 
            return {
                ...state,
                token: action.data.token,
                isAdmin: action.data.isAdmin
            }
        case SET_SETTINGS: 
            return {
                ...state,
                settings: action.data
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