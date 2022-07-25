import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/Home.module.css";
import TransitionLayout from "../components/Transition/transitionLayout";
import SideLayout from "../layout/SideLayout";
import SemiRoot from "../components/SemiRoot";

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SemiRoot>
        <SideLayout>
          <TransitionLayout>
            <Component {...pageProps} />
          </TransitionLayout>
        </SideLayout>
      </SemiRoot>
    </RecoilRoot>
  );
}

export default MyApp;
