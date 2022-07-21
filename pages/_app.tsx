import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/Home.module.css";
import Map from "../components/Map";
import userList from "../dummy/userList.json";
import TransitionLayout from "../components/Transition/transitionLayout";
import SideLayout from "../layout/SideLayout";

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const user = userList[0];

  return (
    <RecoilRoot>
      <SideLayout>
        <TransitionLayout>
          <Component {...pageProps} />
        </TransitionLayout>
      </SideLayout>
      <Map
        latitude={user.lastSite.latitude}
        longitude={user.lastSite.longitude}
      />
    </RecoilRoot>
  );
}

export default MyApp;
