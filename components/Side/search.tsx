import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BiSearch } from "react-icons/bi";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { mapState } from "../../stores/Map";

export default function SideSearch() {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(() => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(search, (res: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(res[0].y, res[0].x);
        kakao.maps.localMap.setCenter(coords);
      }
    });
  }, [search]);

  return (
    <Container>
      <IconArea onClick={handleSearch}>
        <IconContainer icon={<BiSearch />} size="20px" color="#0fae76" />
      </IconArea>
      <Input
        type="text"
        placeholder="주소를 입력하여 주택 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={({ code }: { code: string }) =>
          code === "Enter" && handleSearch()
        }
      />
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 40px;

  display: flex;
  align-items: center;

  margin: 15px;

  border-radius: 5px;
  border: 2px solid #0fae76;
  outline: none;
`;

const IconArea = styled.span`
  margin: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  height: 100%;

  border-radius: 10px;
  border: none;
  outline: none;
`;
