import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SideContainer from "../../components/Side/container";
import SideJustHeader from "../../components/Side/justHeader";
import AddHouseSearchAddr from "../../components/SearchBar/addHouseSearchAddr";
import IconContainer from "../../components/Icon/IconContainer";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useRecoilState } from "recoil";
import { userDefaultSetState } from "../../stores/UserDefaultSet";

export default function AddHouse() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nowPos, setNowPos] = useState({ latitude: 0, longitude: 0 });
  const [{ lastSite }] = useRecoilState(userDefaultSetState);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window?.kakao !== "undefined") {
      const { kakao } = window;
      const nowCenter = kakao.maps.localMap.getCenter();
      setNowPos({ latitude: nowCenter.La, longitude: nowCenter.Ma });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSite]);

  const step1 = (
    <div>
      <StepNum>1</StepNum>
      <Description>
        등록하실 위치에
        <br />
        마커를 맞추어 주세요.
      </Description>
      <SubDescription>
        혹은 아래에 주소를 정확히 입력해주세요
        <br />
        (동, 호, 수 제외)
      </SubDescription>
      <AddHouseSearchAddr nowPos={nowPos} />
      <NextBtnArea>
        <div className="next-btn">
          다음
          <IconContainer
            icon={<MdOutlineNavigateNext />}
            size="25px"
            top={-2}
            color="white"
          />
        </div>
      </NextBtnArea>
    </div>
  );

  return (
    <>
      <Head>
        <title>주택 추가하기 - 리빙커뮤</title>
        <meta name="description" content={`리빙커뮤에 주택을 추가합니다.`} />
      </Head>
      <SideContainer header={<SideJustHeader title="주택 등록하기" />}>
        <LevelBar>
          {[...Array(3)].map((val, idx) =>
            idx + 1 <= step ? (
              <div key={idx} className="ball now-or-cleared" />
            ) : (
              <div key={idx} className="ball not-cleared" />
            )
          )}
        </LevelBar>
        {step === 1 && step1}
      </SideContainer>
    </>
  );
}

const LevelBar = styled.div`
  padding: 20px 0 10px 0;

  display: flex;
  justify-content: center;
  gap: 10px;

  .ball {
    width: 8px;
    height: 8px;

    border-radius: 50%;

    &.now-or-cleared {
      background: #0fae76;
    }

    &.not-cleared {
      background: #cacaca;
    }
  }
`;

const StepNum = styled.div`
  font-size: 40px;
  font-weight: 500;

  color: #0fae76;
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SubDescription = styled.div`
  font-size: 15px;
  font-weight: 300;
`;

const NextBtnArea = styled.div`
  display: flex;
  justify-content: right;

  .next-btn {
    height: 35px;

    padding: 0 12px 0 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 500;

    border-radius: 5px;

    background: #0fae76;
    color: white;

    cursor: pointer;

    &.disabled {
      background: #dddddd;
    }
  }
`;
