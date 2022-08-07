import styled from "styled-components";
import IconContainer from "../Icon/IconContainer";
import { BiSearch } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { ChangeEvent, useCallback, useState } from "react";
import { IoLocationSharp, IoHomeSharp } from "react-icons/io5";

interface IAutoComplete {
  address_name: string;
  address_type: "REGION" | "REGION_ADDR";
  x: number;
  y: number;
}

export default function AddHouseSearchAddr() {
  const [search, setSearch] = useState("");
  const [viewClear, setViewClear] = useState(false);
  const [autoComplete, setAutoComplete] = useState<IAutoComplete[]>([]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== "undefined") {
      const { kakao } = window;
      const geocoder = new kakao.maps.services.Geocoder();

      setSearch(e.target.value);

      geocoder.addressSearch(
        e.target.value,
        (res: IAutoComplete[], status: string) => {
          console.log(res);
          if (status === kakao.maps.services.Status.OK) {
            setAutoComplete(res);
          } else {
            setAutoComplete([]);
          }
        }
      );
    }
  }, []);

  const handleMove = useCallback(
    (index: number) => {
      if (typeof window !== "undefined") {
        const { kakao } = window;
        const coords = new kakao.maps.LatLng(
          autoComplete[index].y,
          autoComplete[index].x
        );
        kakao.maps.localMap.setCenter(coords);
        setAutoComplete([]);
        setSearch("");
      }
    },
    [autoComplete]
  );

  const handleClear = useCallback(() => setSearch(""), []);

  return (
    <Container
      onMouseEnter={() => setViewClear(true)}
      onMouseLeave={() => setViewClear(false)}
    >
      <IconArea>
        <IconContainer
          icon={<BiSearch />}
          size="20px"
          color="#0fae76"
          top={2.5}
        />
      </IconArea>
      <Input
        type="text"
        placeholder="주소를 입력하여 주택 검색"
        value={search}
        onChange={handleSearch}
      />
      {!!autoComplete.length && (
        <AutoComplete>
          {autoComplete.map((searchWord: IAutoComplete, index: number) => (
            <tr key={index} onClick={() => handleMove(index)}>
              <td width="20px">
                <IconContainer
                  icon={
                    searchWord.address_type === "REGION" ? (
                      <IoLocationSharp />
                    ) : (
                      <IoHomeSharp />
                    )
                  }
                  size="17px"
                  color="#0fae76"
                  top={2.5}
                />
              </td>
              <td>{searchWord.address_name}</td>
            </tr>
          ))}
        </AutoComplete>
      )}
      {viewClear && (
        <IconArea onClick={handleClear}>
          <IconContainer
            icon={<MdCancel />}
            size="15px"
            color="#969faf"
            top={2.5}
          />
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

  margin: 15px 0;

  border-radius: 5px;
  border: 2px solid #0fae76;
  outline: none;
`;

const IconArea = styled.span`
  margin: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;

  border-radius: 10px;
  border: none;
  outline: none;
`;

const AutoComplete = styled.table`
  width: 320px;
  z-index: 100;

  position: absolute;
  top: 280px;
  left: 20px;

  border-radius: 5px;

  font-size: 15px;
  font-weight: 500;

  background: white;

  box-shadow: 1px 1px 5px #c8c8c8;

  tr {
    width: 100%;
    height: 40px;

    display: flex;
    align-items: center;

    padding: 10px;

    cursor: pointer;
  }
`;
