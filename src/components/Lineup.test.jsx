import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Lineup from './Lineup';
import CaseStudy from './CaseStudy';
import { findProject, squad } from '../data/projects';

describe('Lineup', () => {
  it('links every project with a clear name and keeps its summary', () => {
    const lineup = squad.slice(1);
    render(<Lineup projects={lineup} />);
    lineup.forEach((project) => {
      // jsdom puts a space before the visually hidden suffix; browsers do not.
      const link = screen.getByRole('link', { name: (name) => name.replace(/\s+:/, ':') === `${project.name}: read match report` });
      expect(link).toHaveAttribute('href', `#/case/${project.slug}`);
      expect(screen.getByText(project.summary)).toBeInTheDocument();
    });
  });
});

describe('Encoder comparison', () => {
  it('renders as a captioned table on the animal detector report only', () => {
    const { unmount } = render(<CaseStudy project={findProject('animal-detector')} />);
    const table = screen.getByRole('table', { name: /encoder comparison/i });
    expect(within(table).getAllByRole('columnheader')).toHaveLength(3);
    expect(within(table).getByRole('rowheader', { name: 'DINOv3 ConvNeXt-Base' })).toBeInTheDocument();
    unmount();

    render(<CaseStudy project={findProject('bay-noakes')} />);
    expect(screen.queryByRole('table')).toBeNull();
  });
});
