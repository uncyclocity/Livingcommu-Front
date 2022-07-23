import Head from "next/head";
import { useRouter } from "next/router";
import houseList from "../../dummy/houseList.json";
import houseScore from "../../dummy/houseScore.json";
import SideHouseDetailHeader from "../../components/Side/houseDetailHeader";
import SideContainer from "../../components/Side/container";
import SideRate from "../../components/Side/rate";
import SideReview from "../../components/Side/review";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const houseData =
    houseList[houseList.findIndex((houseObj) => id && houseObj.id === +id)];

  const houseReviewData =
    houseScore[
      houseScore.findIndex((houseScoreObj) => id && houseScoreObj.id === +id)
    ];

  const header = <SideHouseDetailHeader data={houseData} />;

  return (
    <>
      <Head>
        <title>{houseData?.name} - 리빙커뮤</title>
        <meta name="description" content={`${houseData?.type}도 리빙커뮤`} />
      </Head>
      <SideContainer header={header}>
        <SideRate data={houseReviewData} />
        <SideReview data={houseReviewData} />
      </SideContainer>
    </>
  );
}
