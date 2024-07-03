// components/Preview.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';
import { ComponentData } from '@/public/Types';
import ImageComponent from '../Components/Image';
import TitleComponent from '../Components/Title';
import TextComponent from '../Components/Paragraph';
import TextWithPictureComponent from '../Components/CaptionPic';

const previewStyle = css`
  position: relative;
  flex: 1;
  overflow: auto;
  padding: 1rem;
  border: 1px solid #ccc;
`;

const parentStyle = css`
  position: relative;
`;

const selectedStyle = css`
  border: 2px dotted #000;
`;

const garbageCanStyle = css`
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
  font-size: 1rem;
`;

const draggingStyle = css`
  opacity: 0.5;
`;

const borderTopStyle = css`
  border-top: 3px solid blue;
`;

const borderBottomStyle = css`
  border-bottom: 3px solid blue;
`;

const Preview = ({
  components,
  onSelectComponent,
  onDeleteComponent,
  onReorderComponents
}: {
  components: ComponentData[];
  onSelectComponent: (component: ComponentData | null) => void;
  onDeleteComponent: (id: string) => void;
  onReorderComponents: (newComponents: ComponentData[]) => void;
}) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<ComponentData | null>(null);
  const [hoveredComponentId, setHoveredComponentId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleClick = (component: ComponentData) => {
    setSelectedComponentId(component.id);
    onSelectComponent(component);
  };

  const handleDelete = (id: string) => {
    onDeleteComponent(id);
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const handleDragStart = (component: ComponentData) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent, component: ComponentData) => {
    e.preventDefault();
    setHoveredComponentId(component.id);
  };

  const handleDrop = () => {
    if (draggedComponent && hoveredComponentId) {
      const newComponents = [...components];
      const draggedIndex = newComponents.findIndex(c => c.id === draggedComponent.id);
      const hoveredIndex = newComponents.findIndex(c => c.id === hoveredComponentId);

      newComponents.splice(draggedIndex, 1);
      newComponents.splice(hoveredIndex, 0, draggedComponent);

      onReorderComponents(newComponents);
    }
    setDraggedComponent(null);
    setHoveredComponentId(null);
  };

  const renderComponent = (component: ComponentData) => {
    switch (component.type) {
      case 'Image':
        return <ImageComponent style={component.style} />;
      case 'Title':
        return <TitleComponent style={component.style} />;
      case 'Paragraph':
        return <TextComponent style={component.style} />;
      case 'CaptionPic':
        return <TextWithPictureComponent style={component.style} />;
      default:
        return <div style={component.style}>{component.type}</div>;
    }
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.style.maxWidth = `${window.innerWidth - 300}px`;
    }
  }, []);

  const getBorderStyle = (componentId: string) => {
    if (hoveredComponentId === componentId && draggedComponent) {
      const hoveredIndex = components.findIndex(c => c.id === hoveredComponentId);
      const draggedIndex = components.findIndex(c => c.id === draggedComponent.id);
      return draggedIndex < hoveredIndex ? borderTopStyle : borderBottomStyle;
    }
    return null;
  };

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
        <div
          key={component.id + component.type}
          draggable
          onDragStart={() => handleDragStart(component)}
          onDragOver={(e) => handleDragOver(e, component)}
          onDrop={handleDrop}
        >
          <div
            key={component.id}
            css={[
              selectedComponentId === component.id ? [selectedStyle, parentStyle] : parentStyle,
              draggedComponent && draggedComponent.id === component.id ? draggingStyle : null,
              getBorderStyle(component.id),
            ]}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(component);
            }}
          >
            {renderComponent(component)}
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
        </div>
      ))}
    </div>
  );
};

export default Preview;
