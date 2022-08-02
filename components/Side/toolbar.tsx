import styled from "styled-components";
import { TiPlus, TiMinus } from "react-icons/ti";
import { MdGpsFixed, MdAddBusiness, MdFilterAlt } from "react-icons/md";
import { useCallback } from "react";

export default function SideToolbar() {
  const handleChangeLevel = useCallback((addNum: number) => {
    if (typeof window !== "undefined") {
      const map = window.kakao.maps.localMap;
      const level = map.getLevel();
      map.setLevel(level + addNum);
    }
  }, []);

  const handleNowLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { kakao } = window;
        const map = kakao.maps.localMap;

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const locPos = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPos);
      });
    }
  }, []);

  const handleReady = useCallback(() => alert("준비중입니다."), []);

  return (
    <>
      <PlusMinusArea>
        <Plus onClick={() => handleChangeLevel(-1)}>
          <TiPlus />
        </Plus>
        <Minus onClick={() => handleChangeLevel(1)}>
          <TiMinus />
        </Minus>
      </PlusMinusArea>
      <Btn onClick={handleNowLocation}>
        <MdGpsFixed />
      </Btn>
      <Btn onClick={handleReady}>
        <MdFilterAlt />
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
