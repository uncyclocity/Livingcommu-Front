import Head from "next/head";
import { useRouter } from "next/router";
import SideLayout from "../../layout/SideLayout";
import houseList from "../../dummy/houseList.json";
import SideHouseDetailHeader from "../../components/Side/houseDetailHeader";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const houseData =
    houseList[houseList.findIndex((houseObj) => id && houseObj.id === +id)];

  const header = <SideHouseDetailHeader title={houseData?.name} />;

  return (
    <>
      <Head>
        <title>리빙커뮤</title>
        <meta
          name="description"
          content="생생한 입주민의 이야기를 담은 커뮤니티, 리빙커뮤입니다."
        />
      </Head>
      <SideLayout header={header}>test</SideLayout>
    </>
  );
}
