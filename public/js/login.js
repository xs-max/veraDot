import axios from 'axios';
import {showAlert} from './alert';

export const login = async (email, password) => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/users/login',
            data: {
                email: email,
                password: password
            }
        });

        if(res.data.status === 'success') {
            if (res.data.data.user.role === "user"){
                showAlert("success", "logged in successfully");
                window.setTimeout(() => {
                    location.assign('/user/dashboard');
                }, 1500);
            }if (res.data.data.user.role === "admin") {
                showAlert("success", "logged in successfully");
                window.setTimeout(() => {
                    location.assign("/admin/dashboard");
                }, 1500);
            }
        }
    } catch(err) {
        showAlert('error', err.response.data.message);
        console.log("error", err.response.data.message);
    }
    

    
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/users/logout',
        });
        if(res.data.status === 'success') {
            showAlert('success', 'logged out successfully');
            window.setTimeout(() => {
                location.assign("/")
            }, 1500);
        }
    } catch (err) {
        showAlert('error', 'Error loggin out ! Try again');
    }
}



