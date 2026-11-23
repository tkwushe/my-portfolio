import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { LabCard, ProjectCard } from './Card';
import { lab, squad } from '../data/projects';

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
