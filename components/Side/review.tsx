import dayjs from "dayjs";
import { BsStarFill } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import styled, { css } from "styled-components";
import { IHouseScore } from "../../type/houseScore";
import IconContainer from "../Icon/IconContainer";
import { IUser } from "../../type/userList";
import { keys, keysKorean } from "../../lib/getAverageScore";
import { useRouter } from "next/router";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";

interface ISideReview {
  reviewData: IHouseScore;
  userListData: IUser[];
}

export default function SideReview({ reviewData, userListData }: ISideReview) {
  const router = useRouter();

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
        <span>
          리뷰 후기&nbsp;
          <span className="review-total-cnt">
            {reviewData?.evaluation.length}
          </span>
        </span>
        <Button
          inner="리뷰 작성하기"
          bgColor="#0fae76"
          textColor="white"
          paddingX="10px"
          paddingY="5px"
          onClick={() => router.push(`/house/${reviewData.id}/writing`)}
        />
      </TotalReview>
      {reviewData?.evaluation.map((evaluation: any, index: number) => {
        const userData =
          userListData[
            userListData.findIndex(
              (userData) => userData.id === evaluation.userId
            )
          ];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const contentRef = useRef<any>(null);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (contentRef.current && contentRef.current.clientHeight > 61) {
            contentRef.current.classList = ["content-area not-show"];
          }
        }, []);
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
            <table>
              <tr className="unit-rating-area">
                {keys &&
                  keys.map((key: string, index: number) => (
                    <td key={key} className="unit-rating">
                      <div className="title">{keysKorean[index]}</div>
                      <div className="score">{evaluation?.scores[key]}</div>
                    </td>
                  ))}
              </tr>
            </table>
            <IconContainer
              icon={<RiDoubleQuotesL />}
              size="23px"
              color="#d6d6d6"
              top={2.5}
            />
            <div className="title">{evaluation.title}</div>
            <div className="content-area" ref={contentRef}>
              <div className="content">
                {evaluation.message.map((content: string, msgIdx: number) => (
                  <>
                    <span key={msgIdx}>{content}</span>
                    <br />
                  </>
                ))}
              </div>
              {
                <div
                  className="view-more"
                  onClick={() => {
                    contentRef.current.classList = ["content-area"];
                  }}
                >
                  ...더 보기
                </div>
              }
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
  justify-content: space-between;

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

  .content-area {
    .content {
      overflow-y: hidden;

      font-size: 15px;
      font-weight: 300;
    }

    .view-more {
      display: none;
    }

    &.not-show {
      .content {
        height: 61px;
      }

      .view-more {
        display: initial;
        cursor: pointer;

        color: #bbbbbb;

        font-size: 15px;
        font-weight: 300;

        &:hover {
          color: #0fae76;
        }
      }
    }
  }

  .unit-rating-area {
    width: 100%;

    padding: 8px 10px;
    margin: 13px 0 8px 0;

    display: flex;

    border-radius: 10px;

    background: #f6f6f6;
  }

  .unit-rating {
    width: 60px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 12px;
    }

    .score {
      font-size: 25px;
      font-weight: 500;

      color: #0fae76;
    }
  }
`;
