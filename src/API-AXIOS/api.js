import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'd538c08b-0a5b-4fe6-b5ae-73c0051f7975'}
})

export const UsersAPI = {
    getUsers(pageSize,pageNumb){
        return instance.get(`users/?count=${pageSize}&page=${pageNumb}`).then(response=>{
            return response
        })
    },
    follow(userId){
        return instance.post(`follow/${userId}`).then(response=>{
            return response
        })
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`).then(response=>{
            return response
        })
    }
}
export const ProfileAPI ={
    getProfile(id){
        return instance.get(`profile/${id}`).then(response=>{
            return response
        })
    },
    getStatus(id){
        return instance.get(`profile/status/${id}`).then(response=>{
            return response
        })
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status}).then(response=>{
            return response
        })
    },
    updateProfile(aboutMe, lookingForAJob, lookingForAJobDescription,fullName, contacts){
        return instance.put(`profile`, {aboutMe, lookingForAJob, lookingForAJobDescription,fullName, contacts}).then(response=>{
            return response
        })
    }
}

export const AuthAPI ={
    authMe(){
        return instance.get(`auth/me`).then(response=>{
            return response
        })
    },
    login(email, password, rememberMe=false){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}