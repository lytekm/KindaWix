// components/Dropdown.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

const dropdownStyle = css`
  margin-bottom: 1rem;
`;

const buttonStyle = css`
  width: 100%;
  padding: 0.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
`;

const contentStyle = (isVisible: boolean) => css`
  display: ${isVisible ? 'block' : 'none'};
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div css={dropdownStyle}>
      <button css={buttonStyle} onClick={toggleVisibility}>
        {label}
      </button>
      <div css={contentStyle(isVisible)}>{children}</div>
    </div>
  );
};

export default Dropdown;
