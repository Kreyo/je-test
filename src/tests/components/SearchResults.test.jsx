import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchResults from '../../components/SearchResults.jsx';

const mockResults = [
  { imdbID: 'tt1375666', Title: 'Inception', Year: '2010' },
  { imdbID: 'tt0816692', Title: 'Interstellar', Year: '2014' },
];

test('renders search results', () => {
  render(
    <Router>
      <SearchResults results={mockResults} />
    </Router>
  );

  const inceptionElement = screen.getByText(/Inception/i);
  const interstellarElement = screen.getByText(/Interstellar/i);

  expect(inceptionElement).toBeInTheDocument();
  expect(interstellarElement).toBeInTheDocument();
});
