import React from 'react'
import './SignIn.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignIn extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    toast();
    try{
    fetch('https://smartbrain-backend-ehav.onrender.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
    } catch {
        console.log("no credentials")
        toast.error('Wrong Credentials.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }
  }

  render() {
    const {onRouteChange} = this.props;
    return (
      <div className='pa3'>
          <div className="card br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
              <main className="pa4 black-80">
                <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input
                        className="field pa2 input-reset ba bg-transparent w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                      />
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
                      value="Sign in"
                    />
                  </div>
                  <ToastContainer />
                  <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                  </div>
                </div>
              </main>
          </div>
      </div>
    );
  }
}

export default SignIn