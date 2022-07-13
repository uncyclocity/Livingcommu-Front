import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Map from "../components/Map";
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
      <Map latitude={37.385046181803204} longitude={127.12331635503742} />
    </div>
  );
};

export default Home;
