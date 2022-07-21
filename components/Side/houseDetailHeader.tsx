import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";

interface IHouseDetailHeader {
  data?: {
    name: string;
    address_old: { full: string };
  };
}

export default function SideHouseDetailHeader({ data }: IHouseDetailHeader) {
  return (
    <Container>
      <IconContainer icon={<IoArrowBackOutline />} size="22px" color="white" />
      <Center>
        <Title>{data?.name}</Title>
        <Address>{data?.address_old.full}</Address>
      </Center>
      <IconContainer icon={<IoClose />} size="22px" color="white" />
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 80px;

  padding: 0 20px;

  border-radius: 15px 15px 0 0;

  display: flex;
  align-items: center;

  background: #0fae76;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: white;

  margin: 0 10px;

  font-weight: 500;
  font-size: 20px;
`;

const Address = styled.div`
  color: white;

  margin: 0 10px;

  font-weight: 200;
  font-size: 15px;
`;
