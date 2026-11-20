import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Walkthrough from './Walkthrough';

const shots = [
  { src: '/one.jpg', alt: 'First screen', caption: 'The first screen.' },
  { src: '/two.jpg', alt: 'Second screen', caption: 'The second screen.' },
];

describe('Walkthrough', () => {
  it('swaps the shot and caption when a step is chosen', () => {
    render(<Walkthrough title="Season 1" shots={shots}><p>Season text</p></Walkthrough>);
    expect(screen.getByText('Season text')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'First screen' })).toBeInTheDocument();

    const second = screen.getByRole('button', { name: 'The second screen.' });
    expect(second).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(second);

    expect(second).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('img', { name: 'Second screen' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /full size/i })).toHaveAttribute('href', '/two.jpg');
  });
});
