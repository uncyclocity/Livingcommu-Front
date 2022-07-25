import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { keyframes } from "styled-components";
import {
  getAverageStar,
  getAverageStarClickable,
  keysKorean,
} from "../../lib/getAverageScore";

interface ISideWritingRating {
  rates: number[];
  setRates: Dispatch<SetStateAction<number[]>>;
}

const avgFill = (
  <IconContainer icon={<BsStarFill />} size="25px" color="#efaf00" top={2.5} />
);

const avgHalf = (
  <IconContainer icon={<BsStarHalf />} size="25px" color="#efaf00" top={2.5} />
);

const avgEmpty = (
  <IconContainer icon={<BsStar />} size="25px" color="#efaf00" top={2.5} />
);

export default function SideWritingRating({
  rates,
  setRates,
}: ISideWritingRating) {
  const averageScore = useMemo(
    () => rates?.reduce((sum: number, current: number) => sum + current) / 5,
    [rates]
  );

  const averageStar = getAverageStar(averageScore, avgFill, avgHalf, avgEmpty);

  const handleClickStar = useCallback(
    (index: number, score: number) => {
      rates[index] = score;
      setRates([...rates]);
    },
    [rates, setRates]
  );

  const unitFill = (index: number, score: number) => (
    <div onClick={() => handleClickStar(index, score)}>
      <IconContainer
        icon={<BsStarFill />}
        size="23px"
        color="#0fae76"
        top={2.5}
      />
    </div>
  );

  const unitEmpty = (index: number, score: number) => (
    <div onClick={() => handleClickStar(index, score)}>
      <IconContainer icon={<BsStar />} size="23px" color="#0fae76" top={2.5} />
    </div>
  );

  return (
    <div>
      <AverageArea>
        <div className="average-title">전체 만족도 통계</div>
        <div>
          <span className="score">{averageScore.toFixed(1)}</span>
          <span className="star">{averageStar}</span>
        </div>
      </AverageArea>
      <UnitRateArea>
        {rates.map((score: number, index: number) => (
          <tr key={index} className="star-area">
            <UnitRate key={index}>
              <span className="title">{keysKorean[index]}</span>
              <span className="score">{score}</span>
            </UnitRate>
            <UnitRateStar>
              {getAverageStarClickable(score, index, unitFill, unitEmpty)}
            </UnitRateStar>
          </tr>
        ))}
      </UnitRateArea>
    </div>
  );
}

const AverageArea = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .average-title {
    font-size: 13px;
    font-weight: 500;
  }

  .score {
    font-size: 28px;
    font-weight: 500;

    color: #0fae76;
  }

  .star {
    margin: 0 5px;
    position: relative;
    bottom: 2px;
  }
`;

const UnitRateArea = styled.table`
  width: 100%;

  padding: 3px 10px;
  margin: 15px 0;

  border-radius: 10px;

  background: #f6f6f6;

  .star-area {
    display: flex;

    margin: 5px 0;
  }
`;

const UnitRateStar = styled.td`
  width: 125%;

  padding-left: 5px;

  display: flex;
`;

const UnitRate = styled.td`
  width: 75%;

  display: flex;
  align-items: center;

  padding-right: 5px;

  .score {
    font-size: 20px;
    font-weight: 500;

    color: #0fae76;
  }

  .title {
    width: 100%;

    margin-right: 5px;

    font-size: 12px;
    text-align: right;

    color: #424242;
  }
`;
