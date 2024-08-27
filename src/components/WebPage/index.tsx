// import React, { useState, useEffect } from "react";
// import { apiService } from "@/pages/api/Service/apiService";
// import { Container, Input, List, ListItem, Column } from "./styles";
// import WebPageForm from "./WebPageForm";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import Button from "../Button";

// interface WebPage {
//   id: number;
//   title: string;
//   content: string;
//   url: string;
// }

// const WebPageList: React.FC = () => {
//   const [webPages, setWebPages] = useState<WebPage[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [editingWebPage, setEditingWebPage] = useState<WebPage | null>(null);
//   const [isCreating, setIsCreating] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     fetchWebPages();
//   }, []);

//   const fetchWebPages = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await apiService.get("/WebPage/PagesList");
//       if (data.status && Array.isArray(data.dados)) {
//         setWebPages(data.dados);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateWebPage = async () => {
//     if (editingWebPage) {
//       try {
//         await apiService.post("/WebPage/CreatePage", {
//           ...editingWebPage,
//         });
//         setEditingWebPage(null);
//         setIsCreating(false);
//         fetchWebPages();
//       } catch (error) {
//         console.error("Failed to create web page", error);
//       }
//     }
//   };

//   const handleEditWebPage = async () => {
//     if (editingWebPage) {
//       try {
//         await apiService.put(
//           `/WebPage/EditPage/${editingWebPage.id}`,
//           editingWebPage
//         );
//         setEditingWebPage(null);
//         fetchWebPages();
//       } catch (error) {
//         console.error("Failed to update web page", error);
//       }
//     }
//   };

//   const handleDeleteWebPage = async (webPageId: number) => {
//     try {
//       await apiService.delete(`/WebPage/RemovePage/${webPageId}`);
//       fetchWebPages();
//     } catch (error) {
//       console.error("Failed to delete web page", error);
//     }
//   };

//   const startCreatingWebPage = () => {
//     setEditingWebPage({
//       id: 0,
//       title: "",
//       content: "",
//       url: "",
//     });
//     setIsCreating(true);
//   };

//   const cancelCreateOrEditWebPage = () => {
//     setEditingWebPage(null);
//     setIsCreating(false);
//   };

//   const filteredWebPages = webPages.filter((webPage) =>
//     webPage.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container>
//       <h1>Web Pages</h1>
//       <Input
//         type="text"
//         placeholder="Search by title..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {!isCreating && !editingWebPage && (
//         <>
//           <Button
//             onClick={startCreatingWebPage}
//             text="New Web Page"
//             icon={<FaPlus />}
//           />
//         </>
//       )}

//       {(isCreating || editingWebPage) && (
//         <WebPageForm
//           webPage={editingWebPage!}
//           onChange={(e) =>
//             setEditingWebPage({
//               ...editingWebPage!,
//               [e.target.name]: e.target.value,
//             })
//           }
//           onSubmit={isCreating ? handleCreateWebPage : handleEditWebPage}
//           onCancel={cancelCreateOrEditWebPage}
//           isEditing={!!editingWebPage}
//         />
//       )}

//       <List>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           filteredWebPages.map((webPage) => (
//             <ListItem key={webPage.id}>
//               <Column>{webPage.title}</Column>
//               <Column>{webPage.content}</Column>
//               <Column>{webPage.url}</Column>
//               <Button
//                 onClick={() => setEditingWebPage(webPage)}
//                 text="Edit"
//                 icon={<FaEdit />}
//               />
//               <Button
//                 onClick={() => handleDeleteWebPage(webPage.id)}
//                 text="Delete"
//                 backgroundColor="red"
//                 icon={<FaTrash />}
//               />
//             </ListItem>
//           ))
//         )}
//       </List>
//     </Container>
//   );
// };

// export default WebPageList;

import React, { useState, useEffect } from "react";
import { apiService } from "@/pages/api/Service/apiService";
import {
  Container,
  Input,
  List,
  ListItem,
  Block,
  Title,
  Content,
  URL,
  ButtonContainer,
} from "./styles";
import WebPageForm from "./WebPageForm";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button";

interface WebPage {
  id: number;
  title: string;
  content: string;
  url: string;
}

const WebPageList: React.FC = () => {
  const [webPages, setWebPages] = useState<WebPage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingWebPage, setEditingWebPage] = useState<WebPage | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchWebPages();
  }, []);

  const fetchWebPages = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.get("/WebPage/PagesList");
      if (data.status && Array.isArray(data.dados)) {
        setWebPages(data.dados);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWebPage = async () => {
    if (editingWebPage) {
      try {
        await apiService.post("/WebPage/CreatePage", {
          ...editingWebPage,
        });
        setEditingWebPage(null);
        setIsCreating(false);
        fetchWebPages();
      } catch (error) {
        console.error("Failed to create web page", error);
      }
    }
  };

  const handleEditWebPage = async () => {
    if (editingWebPage) {
      try {
        await apiService.put(
          `/WebPage/EditPage/${editingWebPage.id}`,
          editingWebPage
        );
        setEditingWebPage(null);
        fetchWebPages();
      } catch (error) {
        console.error("Failed to update web page", error);
      }
    }
  };

  const handleDeleteWebPage = async (webPageId: number) => {
    try {
      await apiService.delete(`/WebPage/RemovePage/${webPageId}`);
      fetchWebPages();
    } catch (error) {
      console.error("Failed to delete web page", error);
    }
  };

  const startCreatingWebPage = () => {
    setEditingWebPage({
      id: 0,
      title: "",
      content: "",
      url: "",
    });
    setIsCreating(true);
  };

  const cancelCreateOrEditWebPage = () => {
    setEditingWebPage(null);
    setIsCreating(false);
  };

  const filteredWebPages = webPages.filter((webPage) =>
    webPage.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>Web Pages</h1>
      <Input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!isCreating && !editingWebPage && (
        <>
          <Button
            onClick={startCreatingWebPage}
            text="New Web Page"
            icon={<FaPlus />}
          />
        </>
      )}

      {(isCreating || editingWebPage) && (
        <WebPageForm
          webPage={editingWebPage!}
          onChange={(e) =>
            setEditingWebPage({
              ...editingWebPage!,
              [e.target.name]: e.target.value,
            })
          }
          onSubmit={isCreating ? handleCreateWebPage : handleEditWebPage}
          onCancel={cancelCreateOrEditWebPage}
          isEditing={!!editingWebPage}
        />
      )}

      <List>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          filteredWebPages.map((webPage) => (
            <ListItem key={webPage.id}>
              <Block>
                <Title>{webPage.title}</Title>
                <Content>{webPage.content}</Content>
                <URL>{webPage.url}</URL>
                <ButtonContainer>
                  <Button
                    onClick={() => setEditingWebPage(webPage)}
                    icon={<FaEdit />}
                  />
                  <Button
                    onClick={() => handleDeleteWebPage(webPage.id)}
                    backgroundColor="red"
                    icon={<FaTrash />}
                  />
                </ButtonContainer>
              </Block>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default WebPageList;
