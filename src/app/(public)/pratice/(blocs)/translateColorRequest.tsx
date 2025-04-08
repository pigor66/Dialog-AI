'use client'

import { Typography } from "@mui/material";

const HighlightChanges = ({ original, corrected }: { original: string; corrected: string }) => {
  const originalWords = original.split(/(\s+|\b)/);
  const correctedWords = corrected.split(/(\s+|\b)/);

  return (
    <Typography component="div" sx={{ wordWrap: 'break-word' }}>
      {originalWords.map((word, index) => {
        const correctedWord = correctedWords[index];
        const isDifferent = word !== correctedWord;


        const formatted = word
          .replace(/([.,])(?!\s)/g, ' ') 
        .split(/\s+/);

        return (
          <span
            key={index}
            style={{
              color: isDifferent ? 'inherit' : 'inherit',
              fontWeight: isDifferent ? 'bold' : 'normal',
            }}
          >
            {formatted.join(' ')}{' '}
          </span>
        );
      })}
    </Typography>

  );
};

export default HighlightChanges;