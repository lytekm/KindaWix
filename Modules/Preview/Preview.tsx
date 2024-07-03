// components/Preview.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import { ComponentData } from '@/public/Types';
import ImageComponent from '../Components/Image';

const previewStyle = css`
  position: relative;
  flex: 1;
  overflow: auto;
  padding: 1rem;
  border: 1px solid #ccc;
`;

const parentStyle = css`
  padding: 0;
`;

const selectedStyle = css`
  border: 2px dotted #000;
`;

const garbageCanStyle = css`
  position: absolute;
  top: 3px;
  right: 0px;
  cursor: pointer;
  font-size: 1rem;
`;

const Preview = ({ components, onSelectComponent, onDeleteComponent }: {
  components: ComponentData[];
  onSelectComponent: (component: ComponentData | null) => void;
  onDeleteComponent: (id: string) => void;
}) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleClick = (component: ComponentData) => {
    setSelectedComponentId(component.id);
    onSelectComponent(component);
  };

  const handleDelete = (id: string) => {
    console.log('handleDelete called with id:', id);
    onDeleteComponent(id);
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const renderComponent = (component: ComponentData) => {
    switch (component.type) {
      case 'Image':
        return <ImageComponent style={component.style} />;
      default:
        return <div style={component.style}>{component.type}</div>;
    }
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.style.maxWidth = `${window.innerWidth - 300}px`;
    }
  }, []);

  return (
    <div
      css={previewStyle}
      onClick={() => {
        setSelectedComponentId(null);
        onSelectComponent(null);
      }}
      ref={previewRef}
    >
      {components.map((component) => (
        <div key={component.id + component.type}>
          <div
            key={component.id}
            css={selectedComponentId === component.id ? [selectedStyle, parentStyle] : parentStyle}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(component);
            }}
          >
            {renderComponent(component)}
          </div>
          {selectedComponentId === component.id && (
            <div
              css={garbageCanStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(component.id);
              }}
            >
              🗑️
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Preview;
