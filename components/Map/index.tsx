import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/Map";
import houseList from "../../dummy/houseList.json";
import houseScore from "../../dummy/houseScore.json";
import { useRouter } from "next/router";
import { TNowPosition } from "../../type/nowPosition";
import { getAverageScore } from "../../lib/getAverageScore";
import { userDefaultSetState } from "../../stores/UserDefaultSet";

interface MapProps {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: MapProps) {
  const [, setNowPos] = useRecoilState(nowPositionState);
  const [, setUserDefaultSet] = useRecoilState(userDefaultSetState);
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

            const newLastSite = {
              latitude: latlng.getLat(),
              longitude: latlng.getLng(),
            };

            geocoder.coord2Address(
              latlng.getLng(),
              latlng.getLat(),
              (address: TNowPosition[]) => setNowPos(address[0])
            );

            setUserDefaultSet((prev) => ({
              ...prev,
              lastSite: newLastSite,
            }));
          };

          const handleZoomChanged = () => {
            const level = localMap.getLevel();
            if (level <= 5) {
              houseList.map((house, index) => {
                const marker = document.createElement("div");
                const houseReviewData =
                  houseScore[
                    houseScore.findIndex(
                      (houseScoreObj) =>
                        house.id && houseScoreObj.id === +house.id
                    )
                  ];

                marker.id = "marker";
                marker.onclick = () => handleViewHouseDetail(house.id);
                marker.innerHTML = `<div>${
                  house.type
                }</div><div id="score">★ ${getAverageScore(
                  houseReviewData
                )}</div>`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    handleViewHouseDetail,
    setNowPos,
    setUserDefaultSet,
    latitude,
    longitude,
  ]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
