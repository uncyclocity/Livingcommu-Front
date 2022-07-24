import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/Map";
import houseList from "../../dummy/houseList.json";
import { useRouter } from "next/router";
import userList from "../../dummy/userList.json";
import { TNowPosition } from "../../type/nowPosition";

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
      if (typeof window !== "undefined") {
        const container = document.getElementById("map");
        const { kakao } = window;

        kakao.maps.load(() => {
          const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          const localMap = new kakao.maps.Map(container, options);
          const geocoder = new kakao.maps.services.Geocoder();

          kakao.maps.localMap = localMap;

          const handleCenterChanged = () => {
            const latlng = localMap.getCenter();

            geocoder.coord2Address(
              latlng.getLng(),
              latlng.getLat(),
              (address: TNowPosition[]) => setNowPos(address[0])
            );

            userList[0].lastSite.latitude = latlng.getLat();
            userList[0].lastSite.longitude = latlng.getLng();
          };

          const handleZoomChanged = () => {
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

          handleCenterChanged();
          handleZoomChanged();

          kakao.maps.event.addListener(
            localMap,
            "center_changed",
            handleCenterChanged
          );
          kakao.maps.event.addListener(
            localMap,
            "zoom_changed",
            handleZoomChanged
          );
        });
      }
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
