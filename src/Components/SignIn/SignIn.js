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

  onSubmitSignIn = async () => {
  toast.dismiss();

  const { signInEmail, signInPassword } = this.state;

  if (!signInEmail || !signInPassword) {
    toast.error('Please fill in all fields', { position: toast.POSITION.TOP_CENTER });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(signInEmail)) {
    toast.error('Invalid email format', { position: toast.POSITION.TOP_CENTER });
    return;
  }

  try {
    const response = await fetch('https://smartbrain-backend-ehav.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const user = await response.json();
    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    } else {
      toast.error('Invalid email or password.', { position: toast.POSITION.TOP_CENTER });
    }
  } catch (error) {
    toast.error('An error occurred. Please try again later.', { position: toast.POSITION.TOP_CENTER });
  }
}


  render() {
    const {onRouteChange} = this.props;
    return (
      <div>
      <ToastContainer style={{fontWeight: 'normal', minWidth: 'fit-content'}}/>
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
                  <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                  </div>
                </div>
              </main>
          </div>
      </div>
      </div>
    );
  }
}

export default SignIn
