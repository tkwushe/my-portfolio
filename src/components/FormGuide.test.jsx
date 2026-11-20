import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import FormGuide from './FormGuide';
import { milestones, monthlyCommits } from '../data/innings';

describe('FormGuide', () => {
  it('lists every month in the table with a year-to-date total', () => {
    render(<FormGuide />);
    const table = screen.getByRole('table', { name: /commits per month/i });
    const rows = within(table).getAllByRole('row');
    expect(rows).toHaveLength(monthlyCommits.length + 1);
    // 2025 adds up to 128 by December.
    const dec25 = within(table).getByRole('rowheader', { name: 'Dec 2025' }).closest('tr');
    expect(within(dec25).getAllByRole('cell')[1]).toHaveTextContent('128');
  });

  it('names every milestone under the Manhattan', () => {
    render(<FormGuide />);
    for (const label of Object.values(milestones)) {
      expect(screen.getAllByText(label, { exact: false }).length).toBeGreaterThan(0);
    }
  });

  it('steps through months with the arrow keys and announces each one', () => {
    render(<FormGuide />);
    const [manhattan] = screen.getAllByRole('group', { name: /arrow keys/i });
    fireEvent.keyDown(manhattan, { key: 'End' });
    expect(manhattan).toHaveTextContent(/Nov 2026 \(to 20 Nov\): 27 commits/);
    fireEvent.keyDown(manhattan, { key: 'ArrowLeft' });
    expect(manhattan).toHaveTextContent(/Oct 2026: 0 commits/);
  });
});
