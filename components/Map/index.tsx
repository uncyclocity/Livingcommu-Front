import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/Map";
import houseList from "../../dummy/houseList.json";
import { useRouter } from "next/router";

interface MapProps {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: MapProps) {
  const [, setNowPos] = useRecoilState(nowPositionState);
  const router = useRouter();

  const handleViewHouseDetail = useCallback(
    (id: number) => {
      router.push(`/house/${id}`);
    },
    [router]
  );

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

        const getHouseList = () => {
          const level = localMap.getLevel();
          if (level <= 5) {
            houseList.map((house) => {
              const marker = document.createElement("div");
              marker.id = "marker";
              marker.onclick = () => handleViewHouseDetail(house.id);
              marker.textContent = "1";
              const overlay = new kakao.maps.CustomOverlay({
                content: marker,
                map: localMap,
                position: new kakao.maps.LatLng(
                  house.coordinate.latitude,
                  house.coordinate.longitude
                ),
              });

              overlay.setMap(localMap);

              kakao.maps.event.addListener(localMap, "zoom_changed", () => {
                const level = localMap.getLevel();
                level > 5 && overlay.setMap(null);
              });
            });
          }
        };

        getCenter();
        getHouseList();

        kakao.maps.event.addListener(localMap, "center_changed", getCenter);
        kakao.maps.event.addListener(localMap, "zoom_changed", getHouseList);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [handleViewHouseDetail, latitude, longitude, setNowPos]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
