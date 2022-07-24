import dayjs from "dayjs";
import { BsStarFill } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { IHouseScore, IScores } from "../../type/houseScore";
import IconContainer from "../Icon/IconContainer";
import { IUser } from "../../type/userList";

interface ISideReview {
  reviewData: IHouseScore;
  userListData: IUser[];
}

export default function SideReview({ reviewData, userListData }: ISideReview) {
  const scoreAvgs = reviewData?.evaluation.map(
    ({ scores }: { scores: any }) => {
      const scoreArr = Object.keys(scores).map((key: string) => scores[key]);
      return (
        scoreArr.reduce((sum: number, current: number) => sum + current) / 5
      );
    }
  );

  return (
    <>
      <TotalReview>
        리뷰 후기&nbsp;
        <span className="review-total-cnt">
          {reviewData?.evaluation.length}
        </span>
      </TotalReview>
      {reviewData?.evaluation.map((evaluation: any, index: number) => {
        const userData =
          userListData[
            userListData.findIndex(
              (userData) => userData.id === evaluation.userId
            )
          ];
        return (
          <UnitReview key={evaluation.id}>
            <div className="avg-area">
              <span>
                <IconContainer
                  icon={<BsStarFill />}
                  size="15px"
                  color="#0fae76"
                  top={2.5}
                />
                <span className="score-avg">{scoreAvgs[index].toFixed(1)}</span>
              </span>
              <span className="user-date">
                <IconContainer icon={<FaUser />} size="11px" top={0.5} />
                {userData.nickname}
                <span className="divider">·</span>
                {userData.id === reviewData.id ? "현 거주자" : "이전 거주자"}
                <span className="divider">·</span>
                {dayjs(evaluation?.createdAt).format("YYYY. MM")}
              </span>
            </div>
            <IconContainer
              icon={<RiDoubleQuotesL />}
              size="23px"
              color="#d6d6d6"
              top={2.5}
            />
            <div className="title">{evaluation.title}</div>
            <div className="content">
              {evaluation.message.map((content: string, index: number) => (
                <>
                  <span>{content}</span>
                  <br />
                </>
              ))}
            </div>
          </UnitReview>
        );
      })}
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

  padding: 8px 0;

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

  .user-date {
    font-size: 13px;
    font-weight: 500;

    color: #bababa;

    .divider {
      margin: 0 5px;
    }
  }

  .title {
    margin-bottom: 5px;

    font-size: 18px;
    font-weight: 500;
  }

  .content {
    overflow-y: hidden;

    font-size: 15px;
    font-weight: 300;
  }
`;
