// jest-dom adds custom matchers for asserting on DOM nodes.
import '@testing-library/jest-dom/vitest';

// jsdom does not implement scrolling.
window.scrollTo = () => {};
