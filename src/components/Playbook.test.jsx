import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Playbook from './Playbook';
import { playbook } from '../data/profile';
import { findProject } from '../data/projects';

describe('Playbook', () => {
  it('shows every rule with a link to where it is seen', () => {
    render(<Playbook />);
    playbook.forEach((rule) => {
      expect(screen.getByRole('heading', { name: rule.title })).toBeInTheDocument();
    });
    expect(screen.getAllByRole('link')).toHaveLength(playbook.length);
  });

  it('only points at pages that exist', () => {
    playbook.forEach((rule) => {
      const match = rule.proof.href.match(/^#\/case\/(.+)$/);
      if (match) expect(findProject(match[1])).toBeDefined();
      else expect(rule.proof.href).toMatch(/^#[a-z]+$/);
    });
  });
});
