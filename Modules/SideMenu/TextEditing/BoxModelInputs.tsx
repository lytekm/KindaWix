// components/BoxModelInputs.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import LabeledInput from './Input';
import Dropdown from '@/public/UI/Dropdown';
import { useStyleContext } from '../StyleContext';

interface BoxModelInputsProps {
  type: 'Border' | 'Margin' | 'Padding';
  handleUpdateStyle: (style: React.CSSProperties) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveStyle: () => void;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BoxModelInputs = ({
  type,
  handleChange,
  saveStyle,
  handleColorChange,
}: BoxModelInputsProps) => {

    const { newStyle, currentStyle, getValueWithoutPx } = useStyleContext();

  const inputConfigs = [
    { label: 'Background Color', name: 'backgroundColor', type: 'color', value: currentStyle.backgroundColor?.toString() || '#ffffff' },
    { label: 'Border Radius', name: 'borderRadius', type: 'text', value: getValueWithoutPx(newStyle.borderRadius) },
    { label: 'Border Width', name: 'borderWidth', type: 'text', value: getValueWithoutPx(newStyle.borderWidth) },
    { label: 'Border Color', name: 'borderColor', type: 'color', value: currentStyle.borderColor?.toString() || '#000000' },
    { label: 'Padding Top', name: 'paddingTop', type: 'text', value: getValueWithoutPx(newStyle.paddingTop) },
    { label: 'Padding Right', name: 'paddingRight', type: 'text', value: getValueWithoutPx(newStyle.paddingRight) },
    { label: 'Padding Bottom', name: 'paddingBottom', type: 'text', value: getValueWithoutPx(newStyle.paddingBottom) },
    { label: 'Padding Left', name: 'paddingLeft', type: 'text', value: getValueWithoutPx(newStyle.paddingLeft) },
    { label: 'Margin Top', name: 'marginTop', type: 'text', value: getValueWithoutPx(newStyle.marginTop) },
    { label: 'Margin Right', name: 'marginRight', type: 'text', value: getValueWithoutPx(newStyle.marginRight) },
    { label: 'Margin Bottom', name: 'marginBottom', type: 'text', value: getValueWithoutPx(newStyle.marginBottom) },
    { label: 'Margin Left', name: 'marginLeft', type: 'text', value: getValueWithoutPx(newStyle.marginLeft) },
  ];  

  const getConfigs = () => {
    switch (type) {
      case 'Border':
        return inputConfigs.filter(config =>
          ['borderRadius', 'borderWidth', 'borderColor'].includes(config.name)
        );
      case 'Margin':
        return inputConfigs.filter(config =>
          ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].includes(config.name)
        );
      case 'Padding':
        return inputConfigs.filter(config =>
          ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].includes(config.name)
        );
      default:
        return [];
    }
  };

  const filteredConfigs = getConfigs();

  return (
    <Dropdown label={type}>
      {filteredConfigs.map(config => (
        <LabeledInput
          key={config.name}
          label={config.label}
          name={config.name}
          type={config.type}
          value={config.value}
          onChange={handleChange}
          onBlur={saveStyle}
          onColorChange={handleColorChange}
        />
      ))}
    </Dropdown>
  );
};

export default BoxModelInputs;
