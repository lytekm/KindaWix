// components/TextWithPictureComponent.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

const containerStyle = css`
  display: flex;
  align-items: center;
`;

const textStyle = css`
  margin-left: 1em;
  font-size: 1em;
`;

interface TextWithPictureComponentProps {
  style?: React.CSSProperties;
}

const TextWithPictureComponent: React.FC<TextWithPictureComponentProps> = ({ style }) => {
  const [isEditingText, setIsEditingText] = useState(false);
  const [text, setText] = useState('Click to edit text.');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleTextClick = () => {
    setIsEditingText(true);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTextBlur = () => {
    setIsEditingText(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div css={containerStyle} style={style}>
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" />
      ) : (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
      {isEditingText ? (
        <textarea
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          css={textStyle}
          style={style}
        />
      ) : (
        <p onClick={handleTextClick} css={textStyle} style={style}>
          {text}
        </p>
      )}
    </div>
  );
};

export default TextWithPictureComponent;
