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
    () => ["정숙도", "교통", "상권", "인테리어", "청결도"],
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
        {unitAverageScore.map((score: number, index: number) => (
          <tr key={index} className="bar-area">
            <td>
              <UnitRate key={index}>
                <span className="title">{keysKorean[index]}</span>
                <span className="score">{unitAverageScore[index]}</span>
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
    margin-right: 5px;

    font-size: 13px;

    color: #424242;
  }
`;
