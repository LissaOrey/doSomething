import * as axios from "axios";


const instance = axios.create({
    // withCredential: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    // headers: {'API-KEY': 'd538c08b-0a5b-4fe6-b5ae-73c0051f7975'}
})

export const UsersAPI = {
    getUsers(pageSize,pageNumb){
        return instance.get(`users/?count=${pageSize}&page=${pageNumb}`).then(response=>{
            return response
        })
    }
}