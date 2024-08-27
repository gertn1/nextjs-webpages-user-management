import React from "react";

interface ImageData {
  src: string;
  alt: string;
  link: string;
}

interface ImageGridProps {
  images: ImageData[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <a href={image.link}>
            <img src={image.src} alt={image.alt} />
            <div>{image.alt}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
