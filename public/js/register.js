import axios from 'axios';
import {showAlert} from './alert';

export const register = async (name, email, password, passwordConfirm, phone) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm,
                phone
            }
        });

        if (res.data.status === 'success') {
            showAlert("success", "logged in successfully");
            window.setTimeout(() => {
              location.assign("/user/dashboard");
            }, 1500);
        }

    } catch(err) {
        showAlert('error', err.response.data.message)
        // console.log(err.response.data.message);
    }
} 