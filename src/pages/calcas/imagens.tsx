import React from "react";
import ImageGrid from "./ImageGrid ";

const images = [
  {
    src: "/images/image1.jpg",
    alt: "Texto para a imagem 1",
    link: "/link1",
  },
  {
    src: "/images/image2.jpg",
    alt: "Texto para a imagem 2",
    link: "/link2",
  },
  {
    src: "/images/image3.jpg",
    alt: "Texto para a imagem 3",
    link: "/link3",
  },
];

const CalcasPage: React.FC = () => {
  return (
    <div>
      <ImageGrid images={images} />
    </div>
  );
};

export default CalcasPage;
