import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

interface ImageData {
  src: string;
  alt: string;
  link: string;
}

interface ImageGridProps {
  images: ImageData[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;

  &:nth-child(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  &:nth-child(2) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }

  &:nth-child(3) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No images available</p>; // Ou qualquer outra mensagem de fallback
  }

  return (
    <GridContainer>
      {images.map((image, index) => (
        <GridItem key={index}>
          <Link href={image.link} passHref>
            <a>
              <StyledImage src={image.src} alt={image.alt} layout="fill" />
              <Overlay>{image.alt}</Overlay>
            </a>
          </Link>
        </GridItem>
      ))}
    </GridContainer>
  );
};
