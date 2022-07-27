import styled from "styled-components";
import { TiPlus, TiMinus } from "react-icons/ti";
import { MdGpsFixed } from "react-icons/md";

export default function SideToolbar() {
  return (
    <>
      <PlusMinusArea>
        <Plus>
          <TiPlus />
        </Plus>
        <Minus>
          <TiMinus />
        </Minus>
      </PlusMinusArea>
      <Btn>
        <MdGpsFixed />
      </Btn>
    </>
  );
}

const Btn = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  box-shadow: 1px 1px 3px #b8b8b8;

  border-radius: 25px;

  color: #0fae76;
  background: white;

  cursor: pointer;
`;

const PlusMinusArea = styled(Btn)`
  width: 36px;
  height: 72px;
`;

const PlusMinusBtn = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #0fae76;
  background: white;
`;

const Plus = styled(PlusMinusBtn)`
  border-bottom: 0.5px solid #ebebeb;
  border-radius: 25px 25px 0 0;
`;

const Minus = styled(PlusMinusBtn)`
  border-radius: 0 0 25px 25px;
`;
