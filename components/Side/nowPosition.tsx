import { IoMdNavigate } from "react-icons/io";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/Map";
import IconContainer from "../Icon/IconContainer";

export default function SideNowPosition() {
  const [nowPos] = useRecoilState(nowPositionState);

  return (
    <NowPosArea>
      <IconContainer
        icon={<IoMdNavigate />}
        size={"15px"}
        color="#0fae76;"
        top={2.5}
      />
      <NowPosTopTitle>지금 이곳은?</NowPosTopTitle>
      <br />
      {nowPos &&
        `${nowPos.address.region_1depth_name} ${nowPos.address.region_2depth_name} ${nowPos.address.region_3depth_name}`}
    </NowPosArea>
  );
}

const NowPosTopTitle = styled.span`
  font-size: 15px;
  color: #0fae76;
`;

const NowPosArea = styled.div`
  width: 100%;
  height: 70px;

  font-weight: bold;
  font-size: 20px;

  color: #2e2e2e;
`;
