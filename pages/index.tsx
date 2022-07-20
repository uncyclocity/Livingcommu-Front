import type { NextPage } from "next";
import Head from "next/head";
import SideLayout from "../layout/SideLayout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>리빙커뮤</title>
        <meta
          name="description"
          content="생생한 입주민의 이야기를 담은 커뮤니티, 리빙커뮤입니다."
        />
      </Head>
      <SideLayout />
    </div>
  );
};

export default Home;
