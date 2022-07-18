import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BiSearch } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { useCallback, useState } from "react";

export default function SideSearch() {
  const [search, setSearch] = useState("");
  const [viewClear, setViewClear] = useState(false);

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

  const handleClear = useCallback(() => setSearch(""), []);

  return (
    <Container
      onMouseEnter={() => setViewClear(true)}
      onMouseLeave={() => setViewClear(false)}
    >
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
      {viewClear && (
        <IconArea onClick={handleClear}>
          <IconContainer icon={<MdCancel />} size="15px" color="#969faf" />
        </IconArea>
      )}
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
