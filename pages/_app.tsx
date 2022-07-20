import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/spoqa.css";
import { RecoilRoot } from "recoil";

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
