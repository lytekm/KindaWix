// components/LabeledInput.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

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
  return (
    <div>
      <label css={labelStyle}>
        {label}
      </label>
      <div css={inputStyle}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={type === 'color' ? onColorChange : onChange}
          onBlur={type === 'color' ? () => {} : onBlur}
        />
        {type === 'text' && (<p>px</p>)}
      </div>
    </div>
  );
};

export default LabeledInput;
