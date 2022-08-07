import Head from "next/head";
import { useRouter } from "next/router";
import houseList from "../../../dummy/houseList.json";
import houseScore from "../../../dummy/houseScore.json";
import userList from "../../../dummy/userList.json";
import SideHouseDetailHeader from "../../../components/Side/houseDetailHeader";
import SideContainer from "../../../components/Side/container";
import SideRate from "../../../components/Side/rate";
import SideReview from "../../../components/Side/review";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDefaultSetState } from "../../../stores/UserDefaultSet";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const houseData = houseList.find((houseObj) => id && houseObj.id === +id);

  const [, setUserDefaultSet] = useRecoilState(userDefaultSetState);

  const houseReviewData = houseScore.find(
    (houseScoreObj) => id && houseScoreObj.id === +id
  );

  const header = <SideHouseDetailHeader houseListData={houseData} />;

  useEffect(() => {
    if (!houseData) return;

    const { kakao } = window;
    const map = kakao.maps.localMap;

    const latitude = houseData.coordinate.latitude;
    const longitude = houseData.coordinate.longitude;

    setUserDefaultSet((prev) => ({
      ...prev,
      lastSite: {
        latitude,
        longitude,
      },
    }));

    const locPos = new kakao.maps.LatLng(latitude, longitude);
    map.setCenter(locPos);
  }, [houseData, setUserDefaultSet]);

  return (
    <>
      <Head>
        <title>{houseData?.name} - 리빙커뮤</title>
        <meta name="description" content={`${houseData?.type}도 리빙커뮤`} />
      </Head>
      <SideContainer header={header}>
        {houseReviewData && userList && (
          <>
            <SideRate reviewData={houseReviewData} />
            <SideReview reviewData={houseReviewData} userListData={userList} />
          </>
        )}
      </SideContainer>
    </>
  );
}
