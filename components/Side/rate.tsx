import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { useCallback, useMemo } from "react";
import { keyframes } from "styled-components";

export default function SideRate({ data }: any) {
  const keys = useMemo(
    () => ["noise", "transit", "commercial", "interrior", "clean"],
    []
  );
  const keysKorean = useMemo(
    () => ["정숙", "교통", "상권", "인테리어", "청결도"],
    []
  );

  const unitAverageScore = useMemo(() => {
    let avgs = [0, 0, 0, 0, 0];
    data?.evaluation.map(({ scores }: any) => {
      keys.map((key: string, index: number) => (avgs[index] += scores[key]));
    });
    avgs = avgs.map((sum) => sum / data?.evaluation.length);
    return avgs;
  }, [data?.evaluation, keys]);

  const averageScore = useMemo(
    () =>
      data?.evaluation
        .map(
          ({ scores }: any) =>
            Object.keys(scores)
              .map((key) => scores[key])
              .reduce((sum: number, current: number) => sum + current) / 5
        )
        .reduce((sum: number, current: number) => sum + current) /
      data?.evaluation.length,
    [data?.evaluation]
  );

  const averageStar = useCallback(
    () =>
      ["", "", "", "", ""].map((val, index) => {
        if (index + 1 < averageScore) {
          return (
            <IconContainer icon={<BsStarFill />} size="25px" color="#efaf00" />
          );
        } else if (index + 0.5 < averageScore) {
          return (
            <IconContainer icon={<BsStarHalf />} size="25px" color="#efaf00" />
          );
        } else {
          return (
            <IconContainer icon={<BsStar />} size="25px" color="#efaf00" />
          );
        }
      }),
    [averageScore]
  );

  return (
    <div>
      <AverageArea>
        <div className="average-title">
          전체 만족도 통계 ({data?.evaluation.length}개)
        </div>
        <div>
          <span className="score">{averageScore}</span>
          <span className="star">{averageStar()}</span>
        </div>
      </AverageArea>
      <UnitRateArea>
        <tr className="bar-area">
          {unitAverageScore.map((score: number, index: number) => (
            <td key={index}>
              <UnitRateBar score={score} />
            </td>
          ))}
        </tr>
        <tr>
          {keys.map((key: string, index: number) => (
            <UnitRate key={index}>
              <div className="score">{unitAverageScore[index]}</div>
              <div className="title">{keysKorean[index]}</div>
            </UnitRate>
          ))}
        </tr>
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
    font-size: 30px;
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

  .bar-area {
    height: 150px;
  }
`;

const barAnimation = (height: number) => keyframes`
  0% {
    height: 0px;
    margin-top: 150px;
  }

  100% {
    height: ${height}px;
    margin-top: ${150 - height}px;
  }
`;

const UnitRateBar = styled.div`
  margin: 0 17px;

  border-radius: 13px;

  background-color: #0fae76;

  animation: ${({ score }: { score: number }) => barAnimation(score * 30)} 0.8s
    ease-in-out forwards;
`;

const UnitRate = styled.td`
  width: 64px;
  text-align: center;

  .score {
    font-size: 30px;
    font-weight: 500;

    color: #0fae76;
  }

  .title {
    font-size: 12px;
  }
`;
