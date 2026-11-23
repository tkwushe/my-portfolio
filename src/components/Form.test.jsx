import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Form, { Pitch } from './Form';
import { form } from '../data/profile';

describe('Form', () => {
  it('lists every stage in order, ending on the proactive one', () => {
    render(<Form />);
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(form.length);
    form.forEach((stage, i) => {
      expect(within(items[i]).getByRole('heading', { name: stage.title })).toBeInTheDocument();
    });
    expect(items.at(-1)).toHaveClass('is-now');
  });

  it('moves up the pitch from one stage to the next', () => {
    const positions = form.map((stage) => stage.x);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    render(<Pitch />);
    expect(screen.getByRole('img', { name: /four positions/i })).toBeInTheDocument();
  });
});
