// components/ImageComponent.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

const imageStyle = css`
  width: 100%;
  height: auto;
`;

interface ImageComponentProps {
  style?: React.CSSProperties;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ style }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" css={imageStyle} style={style} />
      ) : (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
    </div>
  );
};

export default ImageComponent;
