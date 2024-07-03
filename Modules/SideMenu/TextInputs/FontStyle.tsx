// components/FontStyleControls.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

const labelStyle = css`
  display: block;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const dropdownContentStyle = css`
  display: none;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const fontStyleSelectStyle = css`
  width: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const dropdownOpenStyle = css`
  display: flex;
`;

const arrowStyle = css`
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
`;

const arrowOpenStyle = css`
  transform: rotate(180deg);
`;

const textAlignmentStyle = css`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const textAlignmentButtonStyle = css`
  padding: 0.5rem;
  width: 100px;
  cursor: pointer;
`;

const fontWeightStyle = css`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

interface FontStyleControlsProps {
  currentStyle: React.CSSProperties;
  onUpdateStyle: (style: React.CSSProperties) => void;
}

const FontStyleControls: React.FC<FontStyleControlsProps> = ({ currentStyle, onUpdateStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newStyle = { ...currentStyle, [name]: value };
    onUpdateStyle(newStyle);
  };

  const handleButtonClick = (name: string, value: string) => {
    const newStyle = { ...currentStyle, [name]: value };
    onUpdateStyle(newStyle);
  };

  return (
    <div>
      <label css={labelStyle} onClick={toggleDropdown}>
        Font Style Controls
        <span css={[arrowStyle, isOpen && arrowOpenStyle]}>&#9662;</span>
      </label>
      <div css={[dropdownContentStyle, isOpen && dropdownOpenStyle]}>
        <div css={fontStyleSelectStyle}>
          <label css={labelStyle}>Font Style</label>
          <select
            name="fontStyle"
            value={currentStyle.fontStyle || 'normal'}
            onChange={handleSelectChange}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>
        <div css={textAlignmentStyle}>
          <button
            css={textAlignmentButtonStyle}
            onClick={() => handleButtonClick('textAlign', 'left')}
          >
            Left
          </button>
          <button
            css={textAlignmentButtonStyle}
            onClick={() => handleButtonClick('textAlign', 'center')}
          >
            Center
          </button>
          <button
            css={textAlignmentButtonStyle}
            onClick={() => handleButtonClick('textAlign', 'right')}
          >
            Right
          </button>
        </div>
        <div css={fontWeightStyle}>
          <button
            css={textAlignmentButtonStyle}
            onClick={() => handleButtonClick('fontWeight', 'normal')}
          >
            Normal
          </button>
          <button
            css={textAlignmentButtonStyle}
            onClick={() => handleButtonClick('fontWeight', 'bold')}
          >
            Bold
          </button>
          <button
            css={textAlignmentButtonStyle}
            onClick={() => handleButtonClick('fontWeight', 'bolder')}
          >
            Bolder
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontStyleControls;
