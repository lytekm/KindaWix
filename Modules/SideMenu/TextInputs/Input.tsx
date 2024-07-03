// components/LabeledInput.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

const labelStyle = css`
  display: block;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const inputStyle = css`
  width: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const dropdownContentStyle = css`
  display: none;
  flex-direction: column;
  margin-bottom: 0.5rem;
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

interface LabeledInputProps {
    label: string;
    name: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const LabeledInput: React.FC<LabeledInputProps> = ({ label, name, type, value, onChange, onBlur, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <label css={labelStyle} onClick={toggleDropdown}>
        {label}
        <span css={[arrowStyle, isOpen && arrowOpenStyle]}>&#9662;</span>
      </label>
      <div css={[dropdownContentStyle, isOpen && dropdownOpenStyle]}>
        <div css={inputStyle}>
            <input
            type={type}
            name={name}
            value={value}
            onChange={type === 'color' ? onColorChange : onChange}
            onBlur={type === 'color' ? ()=>{} : onBlur}
            />
            {type === 'text' && (<p>px</p>)}
        </div>
      </div>
    </div>
  );
};

export default LabeledInput;
