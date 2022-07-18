import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BiSearch } from "react-icons/bi";

export default function SideSearch() {
  return (
    <Container>
      <IconArea>
        <IconContainer icon={<BiSearch />} size="20px" color="#0fae76" />
      </IconArea>
      <Input type="text" placeholder="주소를 입력하여 주택 검색" />
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 40px;

  display: flex;
  align-items: center;

  margin: 15px;

  border-radius: 5px;
  border: 2px solid #0fae76;
  outline: none;
`;

const IconArea = styled.span`
  margin: 5px;
`;

const Input = styled.input`
  height: 100%;

  border-radius: 5px;
  border: none;
  outline: none;
`;
