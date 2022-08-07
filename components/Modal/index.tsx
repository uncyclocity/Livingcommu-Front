import { Dispatch, SetStateAction } from "react";
import { MdOutlineClear } from "react-icons/md";
import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";

interface ModalProps {
  title: string;
  content: React.ReactElement;
  onCancel: any;
}

export default function Modal({ title, content, onCancel }: ModalProps) {
  return (
    <DarkBg>
      <ModalCnt>
        <Header>
          <Title>{title}</Title>
          {onCancel && (
            <LRBtnArea onClick={onCancel}>
              <IconContainer
                icon={<MdOutlineClear />}
                color="#0fae76"
                size="32px"
                top={-2}
              />
            </LRBtnArea>
          )}
        </Header>
        {content}
      </ModalCnt>
    </DarkBg>
  );
}

const DarkBg = styled.div`
  width: 100vw;
  height: 100vh;

  margin: 0 !important;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  background: #0000007e;
`;

const ModalCnt = styled.div`
  min-width: 500px;

  padding: 20px;

  border-radius: 10px;

  background: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LRBtnArea = styled.div`
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;

  font-size: 25px;
  font-weight: bold;
`;
