import axios from 'axios';

let base = 'http://192.168.199.229:9099/sim/api';

export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };

export const getSimList = params => { return axios.get(`${base}/sim/list`, { params: params }); };

export const refreshSim = (id,params) => { return axios.get(`${base}/sim/refresh/${id}`, { params: params }) ; };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
