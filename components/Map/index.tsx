import { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      const { kakao } = window;
      const container = document.getElementById("map");

      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        kakao.maps.event.addListener(map, "center_changed", () => {
          const latlng = map.getCenter();

          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            (tmp: string) => console.log(tmp)
          );
        });
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
