import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className="flex justify-center">
      <h5 className="text-xl text-red-600 font-semibold">{message}</h5>
    </div>
  );
};

const notificationComponent = {
  ErrorComponent,
};

export default notificationComponent;
