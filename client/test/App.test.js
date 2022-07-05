import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../src/App';

describe('testing app', () => {
  it('should be render ', () => {
    render(<App />);
  });
});
