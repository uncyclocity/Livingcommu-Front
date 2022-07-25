import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { useCallback, useMemo } from "react";
import { keyframes } from "styled-components";
import { IHouseScore } from "../../type/houseScore";
import {
  getAverageScore,
  getAverageStar,
  getUnitAverageScore,
  keysKorean,
} from "../../lib/getAverageScore";

type TSideRate = { reviewData: IHouseScore };

const fill = (
  <IconContainer icon={<BsStarFill />} size="25px" color="#efaf00" top={2.5} />
);

const half = (
  <IconContainer icon={<BsStarHalf />} size="25px" color="#efaf00" top={2.5} />
);

const empty = (
  <IconContainer icon={<BsStar />} size="25px" color="#efaf00" top={2.5} />
);

export default function SideRate({ reviewData }: TSideRate) {
  const averageScore = useMemo(() => getAverageScore(reviewData), [reviewData]);
  const unitAverageScore: number[] = useMemo(
    () => getUnitAverageScore(reviewData),
    [reviewData]
  );

  const averageStar = getAverageStar(averageScore, fill, half, empty);

  return (
    <div>
      <AverageArea>
        <div className="average-title">
          전체 만족도 통계 ({reviewData?.evaluation.length}개)
        </div>
        <div>
          <span className="score">{averageScore.toFixed(1)}</span>
          <span className="star">{averageStar}</span>
        </div>
      </AverageArea>
      <UnitRateArea>
        {unitAverageScore.map((score: number, index: number) => (
          <tr key={index} className="bar-area">
            <td>
              <UnitRate key={index}>
                <span className="title">{keysKorean[index]}</span>
                <span className="score">
                  {unitAverageScore[index].toFixed(1)}
                </span>
              </UnitRate>
            </td>
            <td>
              <UnitRateBar score={score} />
            </td>
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

  margin-top: 20px;

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

  margin: 15px 0;

  .bar-area {
    width: 150px;
  }
`;

const barAnimation = (height: number) => keyframes`
  0% {
    width: 0px;
    margin-right: 232px;
  }

  100% {
    width: ${height}px;
    margin-right: ${232 - height}px;
  }
`;

const UnitRateBar = styled.div`
  height: 10px;

  border-radius: 13px;

  background-color: #0fae76;

  animation: ${({ score }: { score: number }) => barAnimation(score * 46.4)}
    0.8s ease-in-out forwards;
`;

const UnitRate = styled.td`
  display: flex;
  align-items: center;

  .score {
    font-size: 20px;
    font-weight: 500;

    color: #0fae76;
  }

  .title {
    width: 45px;

    margin-right: 5px;

    font-size: 12px;
    text-align: right;

    color: #424242;
  }
`;
