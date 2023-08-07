import React from 'react';
import brain from './brain.gif'
import './Logo.css'

const Logo = () => {
  return (
    <div className='box'>
        <img src={brain} alt="logo" height='100px' width='100px' className='logo'/>
    </div>
  )
}

export default Logo