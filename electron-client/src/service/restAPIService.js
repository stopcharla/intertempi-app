import axios from 'axios';
// import { session } from '../ext';
axios.defaults.baseURL = "http://localhost:8050/api/v1/";

export default {

    async login(email, password) {
        console.log(`$login::{email,password}`)
        let data = {
            emailId: email,
            password: password
        }
        try {
            // delete axios.defaults.headers.common["authorization"];
            let t = await axios.post('/login', data)
            console.log("success::",t)
            localStorage.setItem('token', JSON.stringify(t.data.token));
            axios.defaults.headers.common['authorization'] = JSON.parse(localStorage.getItem('token'));
            return true
        }
        catch (err) {
            console.log(err)
            return false
        }
    },

    async logout() {
        try {
            // axios.defaults.headers.common['Authorization'] =  localStorage.getItem('token');
            let user = JSON.parse(localStorage.getItem('user'))
            let t = await axios.get(`/user/${user._id}/logout`)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return true
        }
        catch (err) {
            console.log(err)
            return false
        }
    }

}

