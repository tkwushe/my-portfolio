import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LabCard, PlayerCard, ProjectCard } from './Card';
import { modules } from '../data/profile';
import { lab, squad } from '../data/projects';

describe('PlayerCard', () => {
  it('flips between front and back with a real toggle button', () => {
    const { container } = render(<PlayerCard />);
    const front = container.querySelector('.card__side--front');
    const back = container.querySelector('.card__side--back');
    const button = screen.getByRole('button', { name: 'Flip card' });

    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(front).not.toHaveAttribute('aria-hidden');
    expect(back).toHaveAttribute('aria-hidden', 'true');
    expect(back).toHaveAttribute('inert');

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveTextContent('Flip card');
    expect(front).toHaveAttribute('aria-hidden', 'true');
    expect(front).toHaveAttribute('inert');
    expect(back).not.toHaveAttribute('aria-hidden');
    expect(back).not.toHaveAttribute('inert');
  });

  it('lists every module mark on the back', () => {
    render(<PlayerCard />);
    fireEvent.click(screen.getByRole('button', { name: 'Flip card' }));
    // Codes on the card, full module names in the abbreviation title.
    modules.forEach((m) => {
      const abbr = screen.getAllByTitle(m.name).find((el) => el.tagName === 'ABBR');
      expect(abbr).toHaveTextContent(m.code);
    });
  });
});

describe('card artwork', () => {
  it('draws decorative SVG art for every project and lab card', () => {
    squad.forEach((project) => {
      const { container, unmount } = render(<ProjectCard project={project} />);
      expect(container.querySelector('.card__art svg.card-art[aria-hidden="true"]')).not.toBeNull();
      unmount();
    });
    lab.forEach((project) => {
      const { container, unmount } = render(<LabCard project={project} />);
      expect(container.querySelector('.card__art svg.card-art[aria-hidden="true"]')).not.toBeNull();
      unmount();
    });
  });
});
