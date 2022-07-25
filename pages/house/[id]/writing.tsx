import Head from "next/head";
import { useRouter } from "next/router";
import houseList from "../../../dummy/houseList.json";
import houseScore from "../../../dummy/houseScore.json";
import userList from "../../../dummy/userList.json";
import SideHouseDetailHeader from "../../../components/Side/houseDetailHeader";
import SideContainer from "../../../components/Side/container";
import SideRate from "../../../components/Side/rate";
import SideReview from "../../../components/Side/review";
import SideWritingRating from "../../../components/Side/writingRating";
import styled from "styled-components";
import { useState } from "react";

export default function Writing() {
  const [rates, setRates] = useState([1, 1, 1, 1, 1]);
  const router = useRouter();
  const { id } = router.query;
  const houseData =
    houseList[houseList.findIndex((houseObj) => id && houseObj.id === +id)];

  const header = <SideHouseDetailHeader houseListData={houseData} />;

  return (
    <>
      <Head>
        <title>{houseData?.name} 글쓰기 - 리빙커뮤</title>
        <meta name="description" content={`${houseData?.type}도 리빙커뮤`} />
      </Head>
      <SideContainer header={header}>
        <Title>
          <span className="review-total-cnt">{houseData?.name}</span>
          &nbsp;리뷰 작성하기
        </Title>
        <SideWritingRating setRates={setRates} rates={rates} />
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

  font-size: 15px;
  font-weight: 400;

  .review-total-cnt {
    color: #0fae76;
  }
`;
