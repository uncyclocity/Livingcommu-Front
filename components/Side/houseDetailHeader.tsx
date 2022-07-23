import { useRouter } from "next/router";
import { useCallback } from "react";
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";

interface IHouseDetailHeader {
  data?: {
    name: string;
    address_old: { full: string };
    type: string;
  };
}

export default function SideHouseDetailHeader({ data }: IHouseDetailHeader) {
  const router = useRouter();

  const handleGoBack = useCallback(() => router.back(), [router]);
  const handleCancel = useCallback(() => router.push("/"), [router]);

  return (
    <Container>
      <Header>
        <div onClick={handleGoBack}>
          <IconContainer
            icon={<IoArrowBackOutline />}
            size="22px"
            color="white"
          />
        </div>
        <Center>
          <Title>{data?.name}</Title>
          <Type>{data?.type}</Type>
          <Address>{data?.address_old.full}</Address>
        </Center>
        <div onClick={handleCancel}>
          <IconContainer icon={<IoClose />} size="22px" color="white" />
        </div>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
`;

const Header = styled.header`
  width: 100%;
  height: 80px;

  position: fixed;
  z-index: 100;

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

  font-weight: 500;
  font-size: 18px;
`;

const Type = styled.div`
  color: white;

  font-weight: 300;
  font-size: 12px;
`;

const Address = styled.div`
  color: white;

  font-weight: 200;
  font-size: 12px;
`;
