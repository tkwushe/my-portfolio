import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FormBoard from './FormBoard';
import { form } from '../data/profile';
import { minuteFor } from '../hooks/useMatchClock';

describe('FormBoard', () => {
  it('opens on the latest stage and shows another when it is chosen', () => {
    render(<FormBoard />);
    const last = form.at(-1);
    expect(screen.getByRole('button', { name: new RegExp(last.title) })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(last.text, { exact: false })).toBeInTheDocument();

    const first = screen.getByRole('button', { name: new RegExp(form[0].title) });
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(form[0].text, { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(last.text, { exact: false })).not.toBeInTheDocument();
  });
});

describe('minuteFor', () => {
  it('runs from kick-off to full time and never outside it', () => {
    expect(minuteFor(0, 2000)).toBe(0);
    expect(minuteFor(1000, 2000)).toBe(45);
    expect(minuteFor(2000, 2000)).toBe(90);
    expect(minuteFor(2600, 2000)).toBe(90);
    expect(minuteFor(-40, 2000)).toBe(0);
    // A page too short to scroll has no clock to run.
    expect(minuteFor(0, 0)).toBe(0);
  });
});
