import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/Map";
import houseList from "../../dummy/houseList.json";

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
  const [, setNowPos] = useRecoilState(nowPositionState);
  const marker =
    "<div style='width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50px; background: #0fae76; color: white; cursor: pointer;'>1</div>";

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
        const localMap = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        kakao.maps.localMap = localMap;

        const getCenter = () => {
          const latlng = localMap.getCenter();

          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            (address: any) => setNowPos(address[0])
          );
        };

        getCenter();

        kakao.maps.event.addListener(localMap, "center_changed", getCenter);

        houseList.map((house) => {
          const overlay = new kakao.maps.CustomOverlay({
            content: marker,
            map: localMap,
            position: new kakao.maps.LatLng(
              house.coordinate.latitude,
              house.coordinate.longitude
            ),
          });

          overlay.setMap(localMap);
        });
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude, marker, setNowPos]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
