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

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContentList: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.get("/WebPage/PagesList");

        console.log("Raw API response:", response);

        // Acessando os dados corretamente da resposta
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

  return (
    <PageWrapper>
      <h1>Noticias da Semana</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <CardGrid>
          {contentItems.map((contentItem) => (
            <ContentCard
              key={contentItem.id}
              heading={contentItem.title}
              description={contentItem.content}
              link={contentItem.url}
            />
          ))}
        </CardGrid>
      )}
    </PageWrapper>
  );
};

export default ContentList;
