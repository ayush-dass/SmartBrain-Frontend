import React from 'react'
import './Register.css'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value })
  }

  onSubmitSignIn = () => {
    toast.dismiss();
  
    const { name, email, password } = this.state;
  
    if (!name || !email || !password) {
      toast.error('Please fill in all the fields.', { position: toast.POSITION.TOP_CENTER });
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email format', { position: toast.POSITION.TOP_CENTER });
      return;
    }
  
    fetch('https://smartbrain-backend-ehav.onrender.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange('home');
        } 
        else if (data === 'Email already exists') {
          toast.error('Email already exists', { position: toast.POSITION.TOP_CENTER });
        }
        else {
          toast.error('Unable to register', { position: toast.POSITION.TOP_CENTER });
        }
      })
      .catch(error => {
        toast.error('An error occurred. Please try again later.', { position: toast.POSITION.TOP_CENTER });
      });
  };
  


  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <ToastContainer style={{ fontWeight: 'normal', minWidth: 'fit-content'}}/>
        <div className='pa3'>
          <div className="card br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input
                      className="field pa2 input-reset ba bg-transparent w-100"
                      type="text"
                      name="name"
                      id="name"
                      onChange={this.onNameChange}
                    />
                    <div className='mv3'>
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input
                        className="field pa2 input-reset ba bg-transparent w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                      />
                    </div>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                      className="field b pa2 input-reset ba bg-transparent w-100"
                      type="password"
                      name="password"
                      id="password"
                      onChange={this.onPasswordChange}
                    />
                  </div>
                </fieldset>
                <div className="">
                  <input
                    onClick={this.onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Create Account"
                  />
                  <div className='mv3'>
                    <p className='db fw6 lh-copy f6'>Already have an account? <span onClick={() => onRouteChange('signin')} className='underline pointer'>SignIn</span></p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Register