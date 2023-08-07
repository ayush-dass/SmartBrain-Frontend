import React from 'react'
import './Rank.css'

const Rank = ({ name, entries }) => {
  return (
    <div style={{padding: '20px 5px 5px'}}>
        <div className='rank-txt f3'>
            {`${name}, your current entry count is --`}
        </div>
        <div className='f1'>
            {entries} 
        </div>
    </div>
  )
}

export default Rank