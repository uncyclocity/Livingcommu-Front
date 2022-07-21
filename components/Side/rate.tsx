import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { useCallback, useMemo } from "react";

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
      keys.map((key, index) => (avgs[index] += scores[key]));
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
            <IconContainer icon={<BsStarFill />} size="18px" color="#efaf00" />
          );
        } else if (index + 0.5 < averageScore) {
          return (
            <IconContainer icon={<BsStarHalf />} size="18px" color="#efaf00" />
          );
        } else {
          return (
            <IconContainer icon={<BsStar />} size="18px" color="#efaf00" />
          );
        }
      }),
    [averageScore]
  );

  return (
    <div>
      <AverageArea>
        <span className="average-title">
          전체 만족도 통계 ({data?.evaluation.length}개)
        </span>
        <span>
          <span className="score">{averageScore}</span>
          <span className="star">{averageStar()}</span>
        </span>
      </AverageArea>
      <UnitRateArea>
        <tr>
          {keys.map((key, index) => (
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
  align-items: center;
  justify-content: space-between;

  .average-title {
    font-size: 12px;
    font-weight: 400;
  }

  .score {
    font-size: 20px;
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
`;

const UnitRate = styled.td`
  width: 64px;
  text-align: center;

  .score {
    font-size: 35px;
    font-weight: 500;

    color: #0fae76;
  }

  .title {
    font-size: 12px;
  }

  & + * {
    border-left: 0.5px solid #e9e9e9;
  }
`;
