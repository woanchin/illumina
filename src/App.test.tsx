import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site', () => {
  render(<App />);
  const linkElement = screen.getByText(/Illumina Flash Card Game/i);
  expect(linkElement).toBeInTheDocument();
});
