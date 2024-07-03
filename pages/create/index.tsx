// pages/index.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Preview from '@/Modules/Preview/Preview';
import Sidebar from '@/Modules/SideMenu/SideMenu';
import { useState } from 'react';
import { ComponentData } from '@/public/Types';
import { StyleProvider } from '@/Modules/SideMenu/StyleContext';

const containerStyle = css`
  display: flex;
  height: 100vh;
`;

const Home = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);

  const handleAddComponent = (type: string) => {
    const newComponent = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      style: { borderStyle: 'solid', borderWidth: '0' },
    };
    setComponents([...components, newComponent]);
    setSelectedComponent(null);
  };

  const handleSelectComponent = (component: ComponentData | null) => {
    setSelectedComponent(component);
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(component => component.id !== id));
    setSelectedComponent(null);
  };

  const handleUpdateStyle = (style: React.CSSProperties) => {
    if (!selectedComponent) return;
    setComponents(
      components.map(component =>
        component.id === selectedComponent.id
          ? { ...component, style }
          : component
      )
    );
  };

  const componentStyles = components.reduce((acc, component) => {
    acc[component.id] = component.style || {};
    return acc;
  }, {} as { [key: string]: React.CSSProperties });

  return (
    <div>
      <Head>
        <title>Website Builder</title>
      </Head>
      <div css={containerStyle}>
        <Preview
          components={components}
          onSelectComponent={handleSelectComponent}
          onDeleteComponent={handleDeleteComponent}
        />
        <StyleProvider>
          <Sidebar
            onAddComponent={handleAddComponent}
            selectedComponent={selectedComponent}
            onUpdateStyle={handleUpdateStyle}
            components={componentStyles}
          />
        </StyleProvider>
      </div>
    </div>
  );
};

export default Home;
