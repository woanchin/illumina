import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '.././components/Counter';

test('renders site', () => {
  render(<Counter />);
  const textElement = screen.getByText(/Round/i);
  const currentScoreTextElement = screen.getByText(/Current Score/i);
  expect(textElement).toBeInTheDocument();
  expect(currentScoreTextElement).toBeInTheDocument();
});