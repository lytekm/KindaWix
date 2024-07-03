// components/Sidebar.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import TextInputs from './TextEditing/TextInputs';
import ImageInputs from './ImageEditing/ImageInputs';
import { ComponentData } from '@/public/Types';
import { useStyleContext } from './StyleContext';

const sidebarStyle = css`
  width: 300px;
  padding: 1rem;
  border-left: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const buttonStyle = css`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
`;

interface SidebarProps {
  onAddComponent: (type: string) => void;
  selectedComponent: ComponentData | null;
  onUpdateStyle: (style: React.CSSProperties) => void;
  components: { [key: string]: React.CSSProperties };
}

const Sidebar = ({ onAddComponent, selectedComponent, onUpdateStyle, components }: SidebarProps) => {
  const { newStyle, currentStyle, setCurrentStyle, setNewStyle } = useStyleContext();

  useEffect(() => {
    if (selectedComponent && components[selectedComponent.id]) {
      setCurrentStyle(components[selectedComponent.id]);
    } else {
      setCurrentStyle({});
    }
  }, [selectedComponent, components]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = `${value}px`;
    const newStyle = { ...currentStyle, [name]: newValue };
    setNewStyle(newStyle);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newStyle = { ...currentStyle, [name]: value };
    onUpdateStyle(newStyle);
    setCurrentStyle(newStyle);
  };

  const saveStyle = () => {
    onUpdateStyle(newStyle);
    setCurrentStyle(newStyle);
  };

  const handleUpdateStyle = (newStyle: React.CSSProperties) => {
    setCurrentStyle(newStyle);
    onUpdateStyle(newStyle);
  };

  return (
    <div css={sidebarStyle}>
      {!selectedComponent && (
        <>
          <button css={buttonStyle} onClick={() => onAddComponent('Title')}>
            Title
          </button>
          <button css={buttonStyle} onClick={() => onAddComponent('Paragraph')}>
            Paragraph
          </button>
          <button css={buttonStyle} onClick={() => onAddComponent('Image')}>
            Image
          </button>
        </>
      )}
      {selectedComponent && selectedComponent.type !== "Image" && (
        <>
          <TextInputs
            handleUpdateStyle={handleUpdateStyle}
            handleChange={handleChange}
            saveStyle={saveStyle}
            handleColorChange={handleColorChange}
          />
        </>
      )}

      {selectedComponent && selectedComponent.type === "Image" && (
        <>
          <ImageInputs
            handleUpdateStyle={handleUpdateStyle}
            handleChange={handleChange}
            saveStyle={saveStyle}
            handleColorChange={handleColorChange}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
