import { afterEach, describe, expect, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import { inningsAverage, inningsTotal, modules, overall } from './data/profile';
import { squad } from './data/projects';

const goTo = (hash) =>
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

afterEach(() => {
  window.location.hash = '';
});

describe('profile data', () => {
  it('derives the overall rating from real module marks', () => {
    expect(inningsTotal).toBe(562);
    expect(overall).toBe(Math.round(inningsTotal / modules.length));
    expect(inningsAverage.toFixed(2)).toBe('80.29');
  });

  it('gives every squad project a case study body', () => {
    squad.forEach((project) => {
      expect(project.body.length).toBeGreaterThan(3);
    });
  });
});

describe('App', () => {
  it('renders the home page with the player card and squad links', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Takudzwa\s*Wushe/i);
    expect(screen.getByAltText('Takudzwa Wushe')).toBeInTheDocument();
    expect(screen.getAllByText(String(overall)).length).toBeGreaterThan(0);
    squad.forEach((project) => {
      expect(document.querySelector(`a[href="#/case/${project.slug}"]`)).not.toBeNull();
    });
  });

  it('opens a case study from its hash route and returns home', () => {
    render(<App />);
    const project = squad[1];

    goTo(`#/case/${project.slug}`);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
    expect(screen.getByRole('link', { name: /back to squad/i })).toBeInTheDocument();

    goTo('#squad');
    expect(screen.getByRole('heading', { name: 'The Squad' })).toBeInTheDocument();
  });

  it('falls back to the home page for an unknown case study', () => {
    window.location.hash = '#/case/not-a-project';
    render(<App />);
    expect(screen.getByRole('heading', { name: 'The Squad' })).toBeInTheDocument();
  });
});
