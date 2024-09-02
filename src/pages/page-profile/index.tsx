import ProfileUpdate from "@/components/Profile";
import { withAuth } from "@/utils/auth";
import React, { FC } from "react";
import styled from "styled-components";

const StyleProfileUpdate = styled.div``;

const Profile: FC = () => {
  return (
    <StyleProfileUpdate>
      <ProfileUpdate />
    </StyleProfileUpdate>
  );
};
export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {
      isOpen: true,
    },
  };
});

export default Profile;
