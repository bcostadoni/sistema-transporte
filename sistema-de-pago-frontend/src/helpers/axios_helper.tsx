import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios'; 
const _callApi = (
    servicePath: string,
    method: 'GET' | 'POST' | 'PUT'| 'DELETE' = 'GET',
    body?: any,
    params?: Record<string, any>
): Promise<AxiosResponse<any>> => {
    const url = `http://localhost:8080${servicePath}`;
    console.log("Request URL:", url);



    const config: AxiosRequestConfig = {
        method,
        url,
        data: body,
        params,
       
    };

    return axios(config);
}

export const callApi = (
    servicePath: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    params?: Record<string, any>
): Promise<AxiosResponse<any>> => {
    return _callApi(servicePath, method, body,params).catch(error => {
        throw error;
    });
}