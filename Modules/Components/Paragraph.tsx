// components/ParagraphComponent.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

const paragraphStyle = css`
  font-size: 1em;
  line-height: 1.5;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0;
  margin: 0;
  resize: none;
`;

interface ParagraphComponentProps {
  style?: React.CSSProperties;
}

const ParagraphComponent: React.FC<ParagraphComponentProps> = ({ style }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [paragraph, setParagraph] = useState('Click to edit paragraph text.');

  const handleParagraphClick = () => {
    setIsEditing(true);
  };

  const handleParagraphChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParagraph(event.target.value);
  };

  const handleParagraphBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <textarea
          value={paragraph}
          onChange={handleParagraphChange}
          onBlur={handleParagraphBlur}
          css={paragraphStyle}
          style={style}
          rows={4} // Optional: adjust rows to fit typical paragraph length
          autoFocus
        />
      ) : (
        <p onClick={handleParagraphClick} css={paragraphStyle} style={style}>
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default ParagraphComponent;
