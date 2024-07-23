// components/TitleComponent.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { on } from 'events';
import React, { useState } from 'react';

const titleStyle = css`
  font-size: 2em;
  font-weight: bold;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0;
  margin: 0;
`;

interface TitleComponentProps {
  style?: React.CSSProperties;
  content?: string;
  onContentChange: (content: string) => void;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ style, onContentChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Click to edit title');

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    onContentChange(title);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          css={titleStyle}
          style={style}
          autoFocus
        />
      ) : (
        <h1 onClick={handleTitleClick} css={titleStyle} style={style}>
          {title}
        </h1>
      )}
    </div>
  );
};

export default TitleComponent;
