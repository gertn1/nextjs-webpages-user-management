import React from "react";
import styled from "styled-components";

interface ContentCardProps {
  heading: string;
  description: string;
  link: string;
}

const CardWrapper = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  width: 400px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: #00aaff;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  flex-grow: 1;
  color: #b0d0e0;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkButton = styled.a`
  color: #00aaff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentCard: React.FC<ContentCardProps> = ({
  heading,
  description,
  link,
}) => {
  return (
    <CardWrapper>
      <Heading>{heading}</Heading>
      <Description>{description}</Description>
      <CardFooter>
        <LinkButton href={link} target="_blank" rel="noopener noreferrer">
          Acesse o Site
        </LinkButton>
      </CardFooter>
    </CardWrapper>
  );
};

export default ContentCard;
