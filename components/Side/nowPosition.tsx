import { IoMdNavigate, IoMdPodium } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import { TbMoodCry } from "react-icons/tb";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/Map";
import IconContainer from "../Icon/IconContainer";
import Slider from "react-slick";
import houseList from "../../dummy/houseList.json";
import { IoWarning } from "react-icons/io5";

export default function SideNowPosition() {
  const [nowPos] = useRecoilState(nowPositionState);

  const top5House = houseList
    .map((house) => {
      if (
        nowPos &&
        house.address_old.eupMyeonDong === nowPos.address.region_3depth_name
      ) {
        return house;
      }
    })
    .sort((a, b): any => {
      if (typeof a?.view === "number" && typeof b?.view === "number") {
        if (a.view > b.view) return 1;
        if (a.view === b.view) return 0;
        if (a.view < b.view) return -1;
      }
    })
    .slice(0, 5);

  const carouselSettings = {
    autoplay: true,
    infinite: true,
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    arrows: false,
  };

  return nowPos ? (
    <>
      <NowPosArea>
        <IconContainer
          icon={<IoMdNavigate />}
          size={"15px"}
          color="#0fae76;"
          top={2.5}
        />
        <NowPosTopTitle>지금 이곳은?</NowPosTopTitle>
        <br />
        {nowPos &&
          `${nowPos.address.region_1depth_name} ${nowPos.address.region_2depth_name} ${nowPos.address.region_3depth_name}`}
      </NowPosArea>
      <NowPosPopularArea>
        <IconContainer
          icon={<IoMdPodium />}
          size={"15px"}
          color="#0fae76;"
          top={3}
        />
        <NowPosPopularTitle>
          <span className="address">{` ${nowPos.address.region_3depth_name}`}</span>{" "}
          인기 주택 TOP 5
        </NowPosPopularTitle>
        <NowPosPopularFrame>
          <Slider {...carouselSettings}>
            {top5House[0] ? (
              top5House.map((house, index) => (
                <div className="item" key={house?.id}>
                  <span>
                    <span className="number">{index + 1}</span>
                    {house?.name}
                  </span>
                  <span>
                    <IconContainer
                      icon={<HiUser />}
                      size={"13px"}
                      color="#0fae76;"
                      top={2}
                    />
                    {house?.view}
                  </span>
                </div>
              ))
            ) : (
              <div className="not-found">
                <IconContainer icon={<TbMoodCry />} size={"13px"} top={-1} />
                {`아직 ${nowPos.address.region_3depth_name}에는 등록 된 주택이 없어요`}
              </div>
            )}
          </Slider>
        </NowPosPopularFrame>
      </NowPosPopularArea>
    </>
  ) : (
    <NotFoundArea>
      <IconContainer icon={<IoWarning />} size={"15px"} top={3} />
      <span>위치를 찾을 수 없습니다.</span>
      <div>지도를 좀 더 확대하거나, 올바른 위치로 이동해주세요.</div>
    </NotFoundArea>
  );
}

const NotFoundArea = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const NowPosTopTitle = styled.span`
  font-size: 15px;
`;

const NowPosArea = styled.div`
  width: 100%;
  height: 65px;

  font-weight: bold;
  font-size: 20px;

  color: #2e2e2e;
`;

const NowPosPopularArea = styled.div`
  width: 100%;
`;

const NowPosPopularTitle = styled.span`
  margin: 0 3px;

  font-size: 15px;
  font-weight: 500;

  .address {
    color: #0fae76;
  }
`;

const NowPosPopularFrame = styled.div`
  height: 30px;

  margin: 5px 0;

  font-weight: 300;

  overflow-y: hidden;

  border: 1px solid #dddddd;
  border-radius: 3px;

  .not-found {
    height: 28.6667px;

    display: flex !important;
    align-items: center;
    justify-content: center;

    font-size: 13px;
  }

  .item {
    height: 28.6667px;

    display: flex !important;
    align-items: center;
    justify-content: space-between;

    & > span {
      max-width: 278px;

      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > span + span {
      margin: 0 10px;

      font-size: 12px;
      font-weight: 400;

      color: #0fae76;
    }
  }

  .number {
    margin: 0 10px;

    font-size: 13px;
    font-weight: bold;

    color: #0fae76;
  }
`;
