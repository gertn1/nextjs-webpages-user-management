import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiService } from "@/pages/api/Service/apiService";
import ContentCard from "./ContentCard";

interface ContentItem {
  id: number;
  title: string;
  content: string;
  url: string;
}

const PageWrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardGrid = styled.div<{ animate: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) =>
    animate ? "translateY(0)" : "translateY(20px)"};
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#007bff" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const ContentList: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchContentItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.get("/WebPage/PagesList");

        if (response && Array.isArray(response.dados)) {
          setContentItems(response.dados);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContentItems();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contentItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setAnimate(true);
    }, 500);
  };
  return (
    <PageWrapper>
      <h1>Noticias da Semana</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <CardGrid animate={animate}>
            {currentItems.map((contentItem) => (
              <ContentCard
                key={contentItem.id}
                heading={contentItem.title}
                description={contentItem.content}
                link={contentItem.url}
              />
            ))}
          </CardGrid>
          <PaginationWrapper>
            {[...Array(Math.ceil(contentItems.length / itemsPerPage))].map(
              (_, index) => (
                <PaginationButton
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              )
            )}
          </PaginationWrapper>
        </>
      )}
    </PageWrapper>
  );
};

export default ContentList;
