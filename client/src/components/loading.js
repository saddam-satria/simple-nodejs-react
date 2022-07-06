import React from 'react';
import { CONTENT_URL } from '../config/constant';

const LoadingComponent = () => {
  return (
    <div className="flex justify-center">
      <img
        src={`${CONTENT_URL}/image/circle-rgb-site.png`}
        alt="loading"
        width={'120px'}
        className="animate-spin"
      />
    </div>
  );
};

export default LoadingComponent;
