// components/FontStyleControls.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Dropdown from '@/public/UI/Dropdown';
import { useStyleContext } from '../StyleContext';

const labelStyle = css`
  display: block;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const fontStyleSelectStyle = css`
  width: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
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
  onUpdateStyle: (style: React.CSSProperties) => void;
}

const FontStyleControls: React.FC<FontStyleControlsProps> = ({ onUpdateStyle }) => {

  const { currentStyle } = useStyleContext();

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
      <Dropdown label='Font Style'>
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
    </Dropdown>
    </div>
  );
};

export default FontStyleControls;
