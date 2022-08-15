import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SideContainer from '../../components/Side/container';
import SideJustHeader from '../../components/Side/justHeader';
import AddHouseSearchAddr from '../../components/SearchBar/addHouseSearchAddr';
import Button from '../../components/Button';
import { useRecoilState } from 'recoil';
import { nowPositionState } from '../../stores/Map';
import houseList from '../../dummy/houseList.json';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import CheckBoxInput from '../../components/CheckBoxInput/Index';

const houseType = [
  { value: 'notSelected', label: '주택의 분류를 선택하세요' },
  { value: 'studio', label: '원룸/빌라(투룸+)' },
  { value: 'single', label: '단독주택/다가구' },
  { value: 'urban', label: '도시형생활주택' },
  { value: 'officetel', label: '오피스텔' },
  { value: 'dormitory', label: '기숙사' },
  { value: 'apt', label: '아파트' },
];

export default function AddHouse() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isNoName, setIsNoName] = useState(false);
  const [nowPos] = useRecoilState(nowPositionState);

  const step1Fn = useCallback(() => {
    houseList.forEach((house) => {
      if (house.address_old.full === nowPos?.address.address_name)
        alert('이미 등록 된 주소입니다.');
      else setStep(2);
    });
  }, [nowPos]);

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
      <AddHouseSearchAddr />
      <NextBtnArea>
        <Button
          onClick={
            nowPos
              ? step1Fn
              : () =>
                  alert(
                    '위치를 찾을 수 없습니다. 지도를 좀 더 확대하거나, 올바른 위치로 이동해주세요.',
                  )
          }
          bgColor={nowPos ? '#0fae76' : '#dddddd'}
          textColor="white"
          paddingX="20px"
          paddingY="5px"
          inner="다음"
        />
      </NextBtnArea>
    </div>
  );

  const step2 = (
    <div>
      <StepNum>2</StepNum>
      <Description>
        주택의 분류를 선택하시고
        <br />
        주택명을 입력해 주세요.
      </Description>
      <Select dataSources={houseType} />
      {console.log(nowPos)}
      {isNoName && nowPos ? (
        <TextInput
          value={`${nowPos.address.region_3depth_name} ${
            nowPos.address.mountain_yn === 'Y' ? '산 ' : ''
          }${nowPos.address.main_address_no}${
            nowPos.address.sub_address_no && '-' + nowPos.address.sub_address_no
          }`}
          disabled
        />
      ) : (
        <TextInput placeholder="주택명을 입력하세요" />
      )}
      <CheckBoxInput
        label="주택명이 없어요. 지번으로 할래요."
        checked={isNoName}
        onChange={(e) => setIsNoName(e.target.checked)}
      />
      <NextBtnArea>
        <Button
          onClick={step1Fn}
          bgColor="#0fae76"
          textColor="white"
          paddingX="20px"
          paddingY="5px"
          inner="다음"
        />
      </NextBtnArea>
    </div>
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { kakao } = window;
      kakao.maps.localMap.setDraggable(step <= 1);
    }
  }, [step]);

  return (
    <>
      <Head>
        <title>주택 추가하기 - 리빙커뮤</title>
        <meta name="description" content={`리빙커뮤에 주택을 추가합니다.`} />
      </Head>
      <SideContainer
        header={
          <SideJustHeader
            backKeyAction={() =>
              step > 1 ? setStep((prev) => prev - 1) : router.back()
            }
            title="주택 등록하기"
          />
        }
      >
        <LevelBar>
          {[...Array(3)].map((val, idx) =>
            idx + 1 <= step ? (
              <div key={idx} className="ball now-or-cleared" />
            ) : (
              <div key={idx} className="ball not-cleared" />
            ),
          )}
        </LevelBar>
        {step === 1 && step1}
        {step === 2 && step2}
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
`;
