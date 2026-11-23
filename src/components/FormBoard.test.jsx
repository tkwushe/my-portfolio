import { describe, expect, it } from 'vitest';
import { fireEvent, render, renderHook, act, screen } from '@testing-library/react';
import FormBoard from './FormBoard';
import { form } from '../data/profile';
import { minuteFor } from '../hooks/useMatchClock';
import { useChant } from '../hooks/useChant';

const shown = (container) => [...container.querySelectorAll('.hero__board-story[data-on="true"]')];

describe('FormBoard', () => {
  it('opens on the latest stage and shows another when it is chosen', () => {
    const { container } = render(<FormBoard />);
    const last = form.at(-1);
    expect(screen.getByRole('button', { name: new RegExp(last.title) })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(last.text);
    expect(shown(container)).toHaveLength(1);

    const first = screen.getByRole('button', { name: new RegExp(form[0].title) });
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(form[0].text);
    expect(shown(container)).toHaveLength(1);
    expect(shown(container)[0]).toHaveTextContent(form[0].text);
  });

  it('lays out every stage so the box never changes height, and hides the drawing from screen readers', () => {
    const { container } = render(<FormBoard />);
    expect(container.querySelectorAll('.hero__board-story')).toHaveLength(form.length);
    expect(container.querySelector('svg.pitch')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
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

describe('useChant', () => {
  const type = (text, init = {}, target = window) => {
    for (const key of text) act(() => { target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...init })); });
  };

  it('fires on the word and on nothing else', () => {
    const { result } = renderHook(() => useChant('coyg'));
    type('cog');
    expect(result.current).toBe(false);
    type('COYG');
    expect(result.current).toBe(true);
  });

  it('ignores shortcuts and typing in form fields', () => {
    const { result } = renderHook(() => useChant('coyg'));
    type('coyg', { ctrlKey: true });
    expect(result.current).toBe(false);
    const input = document.body.appendChild(document.createElement('input'));
    type('coyg', {}, input);
    expect(result.current).toBe(false);
    input.remove();
  });
});
