// components/Sidebar.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import TextInputs from './TextInputs/TextInputs';
import ImageInputs from './ImageInputs/ImageInputs';
import { ComponentData } from '@/public/Types';


const sidebarStyle = css`
  width: 300px;
  padding: 1rem;
  border-left: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const buttonStyle = css`
  display: block;
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
  const [currentStyle, setCurrentStyle] = useState<React.CSSProperties>({});
  const [newStyle, setNewStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (selectedComponent && components[selectedComponent.id]) {
      setCurrentStyle(components[selectedComponent.id]);
    } else {
      setCurrentStyle({});
    }
  }, [selectedComponent, components]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'backgroundColor' || name === 'color' || name === 'borderColor' ? value : `${value}px`;
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

  const getValueWithoutPx = (value: string | number | undefined): string => {
    if (typeof value === 'string' && value.endsWith('px')) {
      return value.replace('px', '');
    }
    return value?.toString() || '';
  };

  const textInputConfigs = [
    { label: 'Background Color', name: 'backgroundColor', type: 'color', value: currentStyle.backgroundColor?.toString() || '#ffffff' },
    { label: 'Font Color', name: 'color', type: 'color', value: currentStyle.color?.toString() || '#000000' },
    { label: 'Font Size', name: 'fontSize', type: 'text', value: getValueWithoutPx(newStyle.fontSize) },
    { label: 'Padding', name: 'padding', type: 'text', value: getValueWithoutPx(newStyle.padding) },
    { label: 'Margin', name: 'margin', type: 'text', value: getValueWithoutPx(newStyle.margin) },
    { label: 'Border Radius', name: 'borderRadius', type: 'text', value: getValueWithoutPx(newStyle.borderRadius) },
    { label: 'Border Width', name: 'borderWidth', type: 'text', value: getValueWithoutPx(newStyle.borderWidth) },
    { label: 'Border Color', name: 'borderColor', type: 'color', value: newStyle.borderColor?.toString() || '#000000' },
  ];

  const imageInputConfigs = [
    { label: 'Padding', name: 'padding', type: 'text', value: getValueWithoutPx(newStyle.padding) },
    { label: 'Margin', name: 'margin', type: 'text', value: getValueWithoutPx(newStyle.margin) },
    { label: 'Border Radius', name: 'borderRadius', type: 'text', value: getValueWithoutPx(newStyle.borderRadius) },
    { label: 'Border Width', name: 'borderWidth', type: 'text', value: getValueWithoutPx(newStyle.borderWidth) },
    { label: 'Border Color', name: 'borderColor', type: 'color', value: newStyle.borderColor?.toString() || '#000000' },
  ];

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
            inputConfigs={textInputConfigs}
            currentStyle={currentStyle}
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
            inputConfigs={imageInputConfigs}
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
