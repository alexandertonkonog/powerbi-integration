import axios from 'axios';

let BX24;
if (!window.BX24) {
    BX24 = {
        callMethod: async () => { return [{NAME: 'Александр Тонконог', ID: 55}]},
        init: async () => {return true},
        getAuth: async () => {return true}
    };
}

const API_URL = 'https://h1.prekrasnodar.com';
const SET_REPORT_GROUPS = 'SET_REPORT_GROUPS';
const SET_REPORT_GROUPS_FOR_ADMIN = 'SET_REPORT_GROUPS_FOR_ADMIN';
const SET_REPORTS = 'SET_REPORTS';
const SET_USERS = 'SET_USERS';
const SET_USER_GROUPS = 'SET_USER_GROUPS';
const SET_AUTH = 'SET_AUTH';
const SET_SETTINGS = 'SET_SETTINGS';
const REMOVE_AUTH = 'REMOVE_AUTH';
const REFRESH_DATA = 'REFRESH_DATA';

const initial = {
    isAdmin: false,
    reportGroups: null,
    reportGroupsAdmin: null,
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
            const result = await axios.post(API_URL + url, options);
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
        const result = await axios.post(API_URL + url, {
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
            const result = await axios.post(API_URL + url, {
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
            const result = await axios.post(API_URL + url, {
                groups
            })
            dispatch({type: disType, data: result.data});
            return {success: true};
        } catch (e) {
            return {success: false};
        }
    }
}

export const getUserReportGroups = () => async (dispatch) => {
    try {
        const result = await axios.get(API_URL + '/api/report/user/get');
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
        const init = await BXInitPromise();
        const auth = await BXAuthPromise();
        const user = await callMethodPromise('profile');
        const id = 1;
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa('jXOJqUHSTK:j1P81OaeLF:' + id);
        const result = await axios.get(API_URL + '/api/token/get');
        dispatch({type: SET_AUTH, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getReportGroups = () => async (dispatch) => {
    try {
        const result = await axios.get(API_URL + '/api/report/group/get');
        dispatch({type: SET_REPORT_GROUPS_FOR_ADMIN, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getReports = () => async (dispatch) => {
    try {
        const result = await axios.get(API_URL + '/api/report/get');
        dispatch({type: SET_REPORTS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const result = await axios.get(API_URL + '/api/user/get');
        dispatch({type: SET_USERS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getUserGroups = () => async (dispatch) => {
    try {
        const result = await axios.get(API_URL + '/api/user/group/get');
        dispatch({type: SET_USER_GROUPS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const getSettings = () => async (dispatch) => {
    try {
        const result = await axios.get(API_URL + '/api/settings/get');
        dispatch({type: SET_SETTINGS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const setSettings = (body) => async (dispatch) => {
    try {
        const result = await axios.post(API_URL + '/api/settings/set', body);
        dispatch({type: SET_SETTINGS, data: result.data});
        return {success: true};
    } catch (e) {
        console.log(e);
        return {success: false};
    }
}

export const refreshData = () => async (dispatch) => {
    try {
        const users = await callMethodPromiseMany('user.get');
        if (users && users.length) {
            const userArray = users.map(item => ({id: item.ID, name: item.NAME}));
            const result = await axios.post(API_URL + '/api/settings/refresh', {users: userArray});
            dispatch({type: SET_USERS, data: result.data.users});
            dispatch({type: SET_REPORTS, data: result.data.reports});
            dispatch({type: REFRESH_DATA, data: result.data.lastRefresh});
        }
    } catch (e) {
        alert('Не удалось обновить пользователей и отчеты');
        console.log(e);
    }
}

const callMethodPromiseMany = async (method, body = {}, percents = 0) => {
    const array = [];
    const promise = new Promise((res, rej) => {
        res(BX24.callMethod(
            // method, 
            // body,
            // function(result) {
            //     if(result.error()) {
            //         rej(result.error());
            //     } else {
            //         this.progress = percents;
            //         if (res.more()) {
            //             array = [...array, ...result.data()]
            //             res.next();
            //         } else {
            //             res(array);
            //         }
            //     }
            // }
        ));
    })
    try {
        return await promise;
    } catch (e) {
        this.progressBar.style.backgroundColor = '#BE1622';
        console.log(e);
    }
}

const callMethodPromise = async (method, body = {}, percents = 0) => {
    const array = [];
    const promise = new Promise((res, rej) => {
        res(BX24.callMethod(
            // method, 
            // body,
            // function(result) {
            //     if(result.error()) {
            //         rej(result.error());
            //     } else {
            //         res(result.data());
            //     }
            // }
        ));
    })
    try {
        return await promise;
    } catch (e) {
        this.progressBar.style.backgroundColor = '#BE1622';
        console.log(e);
    }
}

const BXInitPromise = async (method, body = {}, percents = 0) => {
    const promise = new Promise((res, rej) => {
        res(BX24.init());
    })
    try {
        return await promise;
    } catch (e) {
        this.progressBar.style.backgroundColor = '#BE1622';
        console.log(e);
    }
}

const BXAuthPromise = async (method, body = {}, percents = 0) => {
    const promise = new Promise((res, rej) => {
        res(BX24.getAuth());
    })
    try {
        return await promise;
    } catch (e) {
        this.progressBar.style.backgroundColor = '#BE1622';
        console.log(e);
    }
}

export const mainReducer = (state = initial, action) => {
    switch(action.type) {
        case SET_REPORT_GROUPS: 
            return {
                ...state,
                reportGroups: action.data
            }
        case SET_REPORT_GROUPS_FOR_ADMIN: 
            return {
                ...state,
                reportGroupsAdmin: action.data
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
                isAdmin: action.data.isAdmin,
                lastRefresh: action.data.lastRefresh
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
        case REFRESH_DATA: 
            return {
                ...state,
                lastRefresh: action.data,
            }
        default:
            return state;
    }
}