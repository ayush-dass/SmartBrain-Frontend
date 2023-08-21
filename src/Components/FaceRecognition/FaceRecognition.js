import React, { useState } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const [facesDetected, setFacesDetected] = useState(false);

  const renderBoundingBoxes = () => {
    if (facesDetected && box && box.length > 0) {
      return box.map((face, i) => (
        <div
          key={i}
          className="bounding-box"
          style={{
            top: face.topRow,
            left: face.leftCol,
            bottom: face.bottomRow,
            right: face.rightCol,
          }}
        ></div>
      ));
    }
    return null;
  };

  return (
    <div className="face ma">
      <div className="absolute mt3 ph4">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          heigh="auto"
          onLoad={() => setFacesDetected(true)}
        />
        {renderBoundingBoxes()}
      </div>
    </div>
  );
};

export default FaceRecognition;
