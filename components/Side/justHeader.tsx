import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IoArrowBackOutline, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import IconContainer from '../Icon/IconContainer';

interface IJustHeader {
  title: string;
  backKeyAction?: any;
}

export default function SideJustHeader({ title, backKeyAction }: IJustHeader) {
  const router = useRouter();

  const handleGoBack = useCallback(
    () => (backKeyAction ? backKeyAction() : router.back()),
    [backKeyAction, router],
  );
  const handleCancel = useCallback(() => router.push('/'), [router]);

  return (
    <Container>
      <Header>
        <div className="lr-btn" onClick={handleGoBack}>
          <IconContainer
            icon={<IoArrowBackOutline />}
            size="22px"
            color="white"
            top={2.5}
          />
        </div>
        <Center>
          <Title>{title}</Title>
        </Center>
        <div className="lr-btn" onClick={handleCancel}>
          <IconContainer
            icon={<IoClose />}
            size="22px"
            color="white"
            top={2.5}
          />
        </div>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
`;

const Header = styled.header`
  width: 100%;
  height: 60px;

  position: fixed;
  z-index: 100;

  padding: 0 20px;

  border-radius: 15px 15px 0 0;

  display: flex;
  align-items: center;

  background: #0fae76;

  .lr-btn {
    cursor: pointer;
  }
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
