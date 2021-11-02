import axios from 'axios';

export const API = {
    getSignIn:(data:any)=>{
        let url = "http://localhost:5000/packaging/credentials/signIn"
        return axios.post(url, data).then((response) => response.data);
    },
    getSignUp:(data:any)=>{
        let url = "http://localhost:5000/packaging/credentials/signUp"
        return  axios.post(url, data).then((response) => response.data);
    },
    getTokenVerify:(token:any)=>{
        let url = "http://localhost:5000/packaging/credentials/tokenVerify"
        return  axios.get(url, {headers: { Authorization: `Bearer ${token}` }}).then((response) => response.data);
    },
    getClientInfo:()=>{
        let url = "http://localhost:5000/packaging/clientInfo"
        return axios.get(url).then((res)=>res.data)
    },
    clientImageUpload:(formData:any, config:any)=>{
        let url = 'http://localhost:5000/packaging/clientInfo/upload'
        return axios.post(url,formData,config).then((res)=>res.data)
    },
    getClientInfoDetais :  (vendorId:string)=>{
        let url = 'http://localhost:5000/packaging/clientInfo'
        return axios.post(url,[vendorId]).then((res)=>res.data)
    }
}