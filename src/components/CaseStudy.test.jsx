import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CaseStudy from './CaseStudy';
import { findProject, lab } from '../data/projects';

describe('CaseStudy for in-development work', () => {
  it('finds the sports show by slug and marks it as in development with no rating', () => {
    const project = findProject('sports-show');
    expect(project.dev).toBe(true);
    render(<CaseStudy project={project} />);
    expect(screen.getByText(/In development/)).toBeInTheDocument();
    expect(screen.getByText('Where it stands')).toBeInTheDocument();
    expect(screen.queryByText('The result')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to in development/ })).toHaveAttribute('href', '#lab');
  });

  it('never says planning for a project that has a working demo', () => {
    const show = lab.find((project) => project.slug === 'sports-show');
    expect(show.status).toBe('In development');
    expect(JSON.stringify(show)).not.toMatch(/planning/i);
  });
});
