import React, { Component } from 'react';
import RestService from '../service/restAPIService';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if(!this.validateForm()){
          this.setState({errorMessage:'Email or password field are mandatory'})
          return
        }else{
          this.setState({errorMessage:''})
        }

        // make rest call
        const result = await RestService.login(this.state.email, this.state.password);
        if (result){
          this.props.history.push('/home');
        }else{
          this.setState({ errorMessage: 'Invalid credentials' })
        }        
    }

    render() {
        return (

          <div className='App'>
            <div className='App__Form'>
            <div className='FormTitle'>
              <div className='FormCenter'>
          <h1>Login</h1>
            <form onSubmit={this.handleSubmit} className='FormFields' onSubmit={this.handleSubmit} >
            <div className='FormField'>
                <label className='FormField__Label' htmlFor='email'>EmailId or Username</label>
                <input type='text' id='text' className='FormField__Input' placeholder='' name='email' value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className='FormField'>
                <label className='FormField__Label' htmlFor='password'>Password</label>
                <input type='password' id='password' className='FormField__Input' placeholder='' name='password' value={this.state.password} onChange={this.handleChange} />
              </div>
              {this.state.errorMessage.length > 0 ? (<p className='FormField__errorLabel'> {this.state.errorMessage} </p>) : null}
              
              <div className='FormField'>
                  <button className='FormField__Button mr-20'>Sign In</button>
              </div>
              
            </form>
          </div>
              </div>  
          </div>
        </div>

        
        );
    }
}

export default SignIn;