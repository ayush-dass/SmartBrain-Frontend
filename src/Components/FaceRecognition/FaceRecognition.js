import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl , box}) => {
  const faces = Array.from(box).map((face, i) => {return <div key={i} className='bounding-box' style={{top: face.topRow, left:face.leftCol, bottom: face.bottomRow, right:face.rightCol}}></div>})
  return (
    <div className='face ma'>
        <div className='absolute mt3 ph4'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        {faces}
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    </div>
  )
}

export default FaceRecognition