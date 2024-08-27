import React from "react";
import { Form, Input } from "../styles";
import Button from "@/components/Button";
import { FaEdit, FaPlus } from "react-icons/fa";

interface WebPageFormProps {
  webPage: {
    title: string;
    content: string;
    url: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const WebPageForm: React.FC<WebPageFormProps> = ({
  webPage,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  return (
    <Form>
      <Input
        type="text"
        placeholder="Title"
        name="title"
        value={webPage.title}
        onChange={onChange}
      />
      <Input
        type="text"
        placeholder="URL"
        name="url"
        value={webPage.url}
        onChange={onChange}
      />
      <textarea
        placeholder="Content"
        name="content"
        value={webPage.content}
        onChange={onChange}
      />
      <Button
        onClick={onSubmit}
        text={isEditing ? "Update Page" : "Create Page"}
        icon={isEditing ? <FaEdit /> : <FaPlus />}
      />
      <Button onClick={onCancel} text="Cancel" />
    </Form>
  );
};

export default WebPageForm;
