import styled from "styled-components";
import { TiPlus } from "react-icons/ti";
import { useRouter } from "next/router";

export default function SideAddHouse() {
  const router = useRouter();

  return (
    <>
      <AddHouseToolbarArea>
        <Btn onClick={() => router.push("house/add")}>
          <TiPlus />
          주택 등록하기
        </Btn>
      </AddHouseToolbarArea>
    </>
  );
}

const AddHouseToolbarArea = styled.div`
  margin: 0 !important;
  padding-top: calc(100vh - 310px);

  pointer-events: none !important;
`;

const Btn = styled.div`
  height: 35px;

  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 15px;
  font-weight: bold;
  box-shadow: 1px 1px 3px #b8b8b8;

  border-radius: 25px;

  color: white;
  background: #0fae76;

  pointer-events: initial;

  cursor: pointer;
`;
