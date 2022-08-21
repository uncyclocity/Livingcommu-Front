import { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { nowPositionState } from '../../stores/Map';
import houseList from '../../dummy/houseList.json';
import houseScore from '../../dummy/houseScore.json';
import { useRouter } from 'next/router';
import { TNowPosition } from '../../type/nowPosition';
import { getAverageScore } from '../../lib/getAverageScore';
import { userDefaultSetState } from '../../stores/UserDefaultSet';
import userDefaultSetList from '../../dummy/userDefaultSet.json';
import IconContainer from '../Icon/IconContainer';
import { HiLocationMarker } from 'react-icons/hi';

export default function Map() {
  const [nowPos, setNowPos] = useRecoilState(nowPositionState);
  const setUserDefaultSet = useSetRecoilState(userDefaultSetState);
  const router = useRouter();

  const handleViewHouseDetail = useCallback(
    (id: number) => {
      router.push(`/house/${id}`);
    },
    [router],
  );

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      if (typeof window !== 'undefined') {
        const container = document.getElementById('map');
        const { kakao } = window;

        kakao.maps.load(() => {
          const { latitude, longitude } =
            userDefaultSetList[0].userDefaultSet.lastSite;

          const options: any = { level: 3 };

          options.center = new kakao.maps.LatLng(latitude, longitude);

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
              (address: TNowPosition[]) =>
                address[0].road_address &&
                address[0].address &&
                setNowPos(address[0]),
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
                const marker = document.createElement('div');
                const houseReviewData =
                  houseScore[
                    houseScore.findIndex(
                      (houseScoreObj) =>
                        house.id && houseScoreObj.id === +house.id,
                    )
                  ];

                marker.id = 'marker';
                marker.onclick = () => handleViewHouseDetail(house.id);
                marker.innerHTML = `<div>${
                  house.type
                }</div><div id="score">★ ${getAverageScore(
                  houseReviewData,
                ).toFixed(1)}</div>`;
                const overlay = new kakao.maps.CustomOverlay({
                  content: marker,
                  map: localMap,
                  position: new kakao.maps.LatLng(
                    house.coordinate.latitude,
                    house.coordinate.longitude,
                  ),
                });

                overlay.setMap(localMap);

                kakao.maps.event.addListener(localMap, 'zoom_changed', () => {
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
            'center_changed',
            handleCenterChanged,
          );
          kakao.maps.event.addListener(
            localMap,
            'zoom_changed',
            handleZoomChanged,
          );
        });
      }
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [handleViewHouseDetail, setNowPos, setUserDefaultSet]);

  return (
    <>
      <MapContainer id="map" />
      {typeof location !== 'undefined' && location.pathname === '/house/add' && (
        <CenterMarker>
          <div className="now-pos">{nowPos?.address.address_name}</div>
          <IconContainer
            icon={<HiLocationMarker />}
            size="50px"
            top={0}
            color="#0fae76"
          />
        </CenterMarker>
      )}
    </>
  );
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const CenterMarker = styled.div`
  z-index: 10000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: calc(50% - 70px);
  left: calc(50% - 111px);

  .now-pos {
    min-width: 210px;
    height: 29px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    text-align: center;
    text-overflow: ellipsis;
    color: white;

    border: 1px solid #dedede;
    border-radius: 10px;

    background: #0fae76;
    box-shadow: 1px 1px 2px rgba(131, 131, 131, 0.089);
  }
`;
