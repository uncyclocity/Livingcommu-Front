import Head from "next/head";
import { useRouter } from "next/router";
import houseList from "../../../dummy/houseList.json";
import houseScoreList from "../../../dummy/houseScore.json";
import SideHouseDetailHeader from "../../../components/Side/houseDetailHeader";
import SideContainer from "../../../components/Side/container";
import SideWritingRating from "../../../components/Side/writingRating";
import styled from "styled-components";
import { useCallback, useState } from "react";
import SideWritingReview from "../../../components/Side/writingReview";
import { FieldValues } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../../stores/User";
import dayjs from "dayjs";
import { keys, TReviewScore } from "../../../lib/getAverageScore";

export default function Writing() {
  const [rates, setRates] = useState([1, 1, 1, 1, 1]);
  const [user] = useRecoilState(userState);
  const router = useRouter();
  const { id } = router.query;
  const houseData =
    houseList[houseList.findIndex((houseObj) => id && houseObj.id === +id)];

  const header = <SideHouseDetailHeader houseListData={houseData} />;

  const handleUpload = useCallback(
    (data: FieldValues) => {
      const houseIdx = houseScoreList.findIndex(
        (houseScore) => id && houseScore.id === +id
      );
      const now: any = dayjs();

      const newReview = {
        userId: user.id,
        createdAt: now,
        scores: {
          noise: 0,
          transit: 0,
          commercial: 0,
          interrior: 0,
          clean: 0,
        },
        title: data.title,
        message: data.content.split("\n"),
      };

      keys.map((key: TReviewScore, index: number) => {
        newReview.scores[key] = rates[index];
      });

      houseScoreList[houseIdx].evaluation.push(newReview);

      router.back();
    },
    [id, rates, router, user.id]
  );

  return (
    <>
      <Head>
        <title>{houseData?.name} 리뷰 작성 - 리빙커뮤</title>
        <meta name="description" content={`${houseData?.type}도 리빙커뮤`} />
      </Head>
      <SideContainer header={header}>
        <Title>
          <span className="review-total-cnt">{houseData?.name}</span>
          &nbsp;리뷰 작성하기
        </Title>
        <SideWritingRating setRates={setRates} rates={rates} />
        <SideWritingReview handleUpload={handleUpload} />
      </SideContainer>
    </>
  );
}

const Title = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0;
  margin-bottom: 15px;

  font-size: 16px;
  font-weight: 400;

  .review-total-cnt {
    color: #0fae76;
  }
`;
