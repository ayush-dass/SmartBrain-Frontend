import React from 'react'
import './Navigation.css'


const Navigation = ({onRouteChange , isSignedIn}) => {
  if(isSignedIn)
  {
    return (
      <div className='nav1'>
            <p className=' smart1 f3 black pa3 pointer'>Smart Brain</p>
            <p onClick={() => onRouteChange('signout')} className='signout f3 link dim black underline pa3 pointer'>Sign Out</p>
      </div>
    )
  }
  else
  {
    return (
      <div className='nav2'>
        <p className=' smart2 f3 black pa3 pointer'>Smart Brain</p>
        <div className='signin'>
          <p onClick={() => onRouteChange('signin')} className='link2_1 small f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='link2_2 small f3 link dim black underline pa3 pointer'>Register</p>
        </div>
      </div>
    )
  }

}

export default Navigation