import '@babel/polyfill';
import {login, logout} from './login';
import {updateSettings} from './updateSettings';
import { register } from './register';
import { beforePayment, registerVehicle } from './carReg';
import { layComplaint } from './complaint';


// Dom elements


const loginForm = document.querySelector('.login');
const regForm = document.querySelector('.reg')
const logoutBtn = document.querySelector('.logout');
const vehicleRegForm = document.querySelector('.car-reg')
const paymentForm = document.querySelector('.pay');
const complaintForm = document.querySelector('.complaint');

// Values



// delegations


if (loginForm) {

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById("login-input-user").value;
        const password = document.getElementById("login-input-password").value;
        login(email, password);
    });
}

if(logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}


if (regForm) {
    regForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById("login-input-user").value;
        const email = document.getElementById("login-input-email").value;
        const password = document.getElementById("login-input-password").value;
        const passwordConfirm = document.getElementById("login-input-cpass").value;
        const phone = document.getElementById("login-input-phone").value;

        register(name, email, password, passwordConfirm, phone);

    })
}

if (vehicleRegForm) {
    vehicleRegForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData();
        
        data.append('vehicleType', document.getElementById('v-type').value);
        data.append('plateNumber', document.getElementById('plate').value);
        data.append(
          'proofOfOwnership',
          document.getElementById('owner').files[0].name
        );
        beforePayment(data);
    })
}

if(paymentForm) {
    paymentForm.addEventListener('submit', e => {
        e.preventDefault();
       const amount = document.getElementById("amount").value;
        registerVehicle(amount);

        

    })
}

if(complaintForm) {
    console.log('hi')
    complaintForm.addEventListener('submit', e=> {
        e.preventDefault();
        const complaintSubject = document.querySelector('#subject').value;
        const complaint = document.querySelector('#complaint').value;

        layComplaint(complaintSubject, complaint);
    })
}

