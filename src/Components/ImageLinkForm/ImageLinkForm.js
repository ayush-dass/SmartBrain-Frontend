import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
        <p>This Magic Brain will detect faces in your pictures. Give it a try !</p>
        <div className="link center">
            <input type="url" className="url-input" placeholder="Enter your image url" onChange={onInputChange}/>
            <button type="button" 
                    className="detect-button"
                    onClick={onButtonSubmit}
            ><b>Detect</b></button>
        </div>
    </div>
  )
}

export default ImageLinkForm