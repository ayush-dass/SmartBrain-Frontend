import './App.css';
import 'tachyons';
import ParticlesBg from 'particles-bg'
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation'; 
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '86543df9861a43beba21f9a46f27c05e';
  const USER_ID = 'ayushdas';       
  const APP_ID = 'SmartBrain';  
  const IMAGE_URL = imageUrl;
  
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}

let config = {
  position: "absolute",
  zIndex: -1,
  top: 0,
  left: 0 

};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map( (box) => { return box.region_info.bounding_box})
    
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = clarifaiFace.map((face) => {
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
    });
    return box;
}

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onRouteChange = (route) => {
    if(route === 'signout')
    {
      this.setState(initialState)
    }
    else if(route === 'home')
    {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    toast();
    const imageUrl = this.state.input.trim(); // Remove leading/trailing spaces
  
    if (!imageUrl) {
      // If the URL is empty, do not proceed
      toast.error('Please provide a valid image URL.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      // If the image is loaded successfully, proceed with face detection and count update
      this.setState({ imageUrl });
  
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(imageUrl))
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://smartbrain-backend-ehav.onrender.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
            this.displayFaceBox(this.calculateFaceLocation(response))
          }
        })
        .catch(err => console.log(err));
    };
  
    image.onerror = () => {
      // If the image fails to load, show an error message
      toast.error('Failed to load the image from the provided URL.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  
    };
  };

  render(){
    return(
      <div className="App">
        <div className='bubbles'><ParticlesBg type="circle" config={config} bg={true}/></div>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {this.state.route === 'home' 
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <ToastContainer style={{width: auto}}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : (
              this.state.route === 'signin' || this.state.route === 'signout'
              ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
        }
      </div>
    )
  };
}

export default App;
