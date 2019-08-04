import axios from 'axios';
import config from '../config.json';
axios.defaults.baseURL = config.hostBaseUrl;

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

    async getUserHomePage() {
        try {
            axios.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
            let home = await axios.get('/home')
            return home;
        }
        catch (err) {
            console.log(err)
            return false
        }
    },

    async logout() {
        try {
            localStorage.removeItem('token');
            return true
        }
        catch (err) {
            console.log(err)
            return false
        }
    }

}

