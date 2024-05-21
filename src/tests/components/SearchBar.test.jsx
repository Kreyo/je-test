import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar.jsx';

test('renders search input and button', () => {
  render(<SearchBar onSearch={() => {}} />);
  const inputElement = screen.getByPlaceholderText(/Search for a movie.../i);
  const buttonElement = screen.getByText(/Search/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('calls onSearch with input value when form is submitted', () => {
  const handleSearch = vi.fn();
  render(<SearchBar onSearch={handleSearch} />);

  const inputElement = screen.getByPlaceholderText(/Search for a movie.../i);
  const buttonElement = screen.getByText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'Inception' } });
  fireEvent.click(buttonElement);

  expect(handleSearch).toHaveBeenCalledWith('Inception');
});
