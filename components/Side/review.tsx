import dayjs from "dayjs";
import { BsStarFill } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import styled from "styled-components";
import { IHouseScore, IScores } from "../../type/houseScore";
import IconContainer from "../Icon/IconContainer";

export default function SideReview({ data }: { data: IHouseScore }) {
  const scoreAvgs = data?.evaluation.map(({ scores }: { scores: any }) => {
    const scoreArr = Object.keys(scores).map((key: string) => scores[key]);
    return scoreArr.reduce((sum: number, current: number) => sum + current) / 5;
  });

  return (
    <>
      <TotalReview>
        리뷰 후기&nbsp;
        <span className="review-total-cnt">{data?.evaluation.length}</span>
      </TotalReview>
      {data?.evaluation.map((evaluation: any, index: number) => (
        <UnitReview key={evaluation.id}>
          <div className="avg-area">
            <span>
              <IconContainer
                icon={<BsStarFill />}
                size="15px"
                color="#0fae76"
              />
              <span className="score-avg">{scoreAvgs[index].toFixed(1)}</span>
            </span>
            <span className="date">
              {dayjs(evaluation?.createdAt).format("YYYY. MM")}
            </span>
          </div>
          <IconContainer
            icon={<RiDoubleQuotesL />}
            size="23px"
            color="#d6d6d6"
          />
          <div className="title">{evaluation.title}</div>
          <div className="content">{evaluation.message}</div>
        </UnitReview>
      ))}
    </>
  );
}

const TotalReview = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;

  font-size: 13px;
  font-weight: 400;

  .review-total-cnt {
    color: #0fae76;
  }
`;

const UnitReview = styled.div`
  width: 100%;
  height: 200px;

  .avg-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .score-avg {
    position: relative;
    top: 5px;

    margin: 0 8px;

    font-size: 25px;
    font-weight: 500;

    color: #0fae76;
  }

  .date {
    font-size: 15px;
    font-weight: 500;

    color: #d6d6d6;
  }

  .title {
    margin-bottom: 5px;

    font-size: 18px;
    font-weight: 500;
  }

  .content {
    font-size: 15px;
  }
`;
