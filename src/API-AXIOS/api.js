import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd538c08b-0a5b-4fe6-b5ae-73c0051f7975',
        // "Content-type": "application/json"
    }
})

export const UsersAPI = {
    getUsers(pageSize,pageNumb,isFriend){
        return instance.get(`users/?count=${pageSize}&page=${pageNumb}&friend=${isFriend}`)
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}
export const ProfileAPI ={
    getProfile(id){
        return instance.get(`profile/${id}`)
    },
    getStatus(id){
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status})
    },
    updatePhoto(image){
        const formData = new FormData();
        formData.append('image', image)
        return instance.put(`profile/photo`, formData, {
            headers:{
                "Content-type": 'multipart/form-data'
            }
        })
    },
    updateProfile(aboutMe, lookingForAJob, lookingForAJobDescription,fullName, contacts){
        return instance.put(`profile`, {aboutMe, lookingForAJob, lookingForAJobDescription,fullName, contacts})
    }
}

export const AuthAPI ={
    authMe(){
        return instance.get(`auth/me`).then(response=>{
            return response.data
        })
    },
    login(email, password, rememberMe=false,captcha){
        return instance.post(`auth/login`, {email, password, rememberMe,captcha})
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}

export const SecurityAPI={
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
    }
}