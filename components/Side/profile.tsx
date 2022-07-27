import styled from "styled-components";
import { CgUserlane } from "react-icons/cg";

export default function SideProfile() {
  return (
    <ProfilePhoto>
      <CgUserlane />
    </ProfilePhoto>
  );
}

const ProfilePhoto = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 25px;

  font-size: 23px;

  color: white;
  background: #0fae76;
  box-shadow: 1px 1px 3px #b8b8b8;

  cursor: pointer;
`;
