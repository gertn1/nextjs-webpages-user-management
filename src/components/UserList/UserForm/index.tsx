// import React, { useState } from "react";
// import { Form, Input, Select } from "../styles";
// import Button from "@/components/Button";
// import { FaEdit, FaUserPlus } from "react-icons/fa";

// interface UserFormProps {
//   user: {
//     name: string;
//     email: string;
//     password?: string;
//     roleId: number;
//   };
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => void;
//   onSubmit: () => void;
//   onCancel: () => void;
//   isEditing: boolean;
// }

// const UserForm: React.FC<UserFormProps> = ({
//   user,
//   onChange,
//   onSubmit,
//   onCancel,
//   isEditing,
// }) => {
//   const [userRoleId, setUserRoleId] = useState<number>(); // RoleId for User by default
//   return (
//     <Form>
//       <Input
//         type="text"
//         placeholder="Name"
//         name="name"
//         value={user.name}
//         onChange={onChange}
//       />
//       <Input
//         type="email"
//         placeholder="Email"
//         name="email"
//         value={user.email}
//         onChange={onChange}
//       />
//       <Input
//         type="password"
//         placeholder="Password"
//         name="password"
//         value={user.password || ""}
//         onChange={onChange}
//       />
//       <Select
//         name="roleId"
//         value={userRoleId}
//         onChange={(e) => setUserRoleId(Number(e.target.value))}
//       >
//         <option value={2}>User</option>
//         <option value={1}>Admin</option>
//       </Select>

//       <Button
//         onClick={onSubmit}
//         text={isEditing ? "Atualizar" : "Criar Usuario"}
//         icon={isEditing ? <FaEdit /> : <FaUserPlus />}
//       />
//       <Button onClick={onCancel} text="Cancelar" />
//     </Form>
//   );
// };

// export default UserForm;

import React, { useState } from "react";
import { Form, Input, Select } from "../styles";
import Button from "@/components/Button";
import { FaEdit, FaUserPlus } from "react-icons/fa";

interface UserFormProps {
  user: {
    name: string;
    email: string;
    password?: string;
    roleId: number;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  return (
    <Form>
      <Input
        type="text"
        placeholder="Name"
        name="name"
        value={user.name}
        onChange={onChange}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={user.email}
        onChange={onChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={user.password || ""}
        onChange={onChange}
      />

      <Button
        onClick={onSubmit}
        text={isEditing ? "Atualizar" : "Criar Usuario"}
        icon={isEditing ? <FaEdit /> : <FaUserPlus />}
      />
      <Button onClick={onCancel} text="Cancelar" />
    </Form>
  );
};

export default UserForm;
