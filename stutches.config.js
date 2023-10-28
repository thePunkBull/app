import { createStitches } from '@stitches/react';

export const { styled, css } = createStitches({
  theme: {
    colors: {
      background: '#f4f4f4',
      text: '#000',
      primary: '#6200ea',
      primaryHover: '#7f39fb',
      border: '#ccc',
      rootBackground: '#eaeaea',
    },
    space: {
      1: '10px',
      2: '20px',
    },
    fontSizes: {
      1: '16px',
    },
    radii: {
      1: '4px',
      2: '5px',
    },
  },
});
