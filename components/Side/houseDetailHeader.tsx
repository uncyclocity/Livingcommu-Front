import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { userDefaultSetState } from "../../stores/UserDefaultSet";
import IconContainer from "../Icon/IconContainer";

interface IHouseDetailHeader {
  houseListData?: {
    name: string;
    address_old: { full: string };
    address_load: { full: string };
    type: string;
  };
}

interface IAddrSwitch {
  type: string;
}

export default function SideHouseDetailHeader({
  houseListData,
}: IHouseDetailHeader) {
  const [userDefaultSet, setUserDefauleSet] =
    useRecoilState(userDefaultSetState);

  const router = useRouter();

  const handleGoBack = useCallback(() => router.back(), [router]);
  const handleCancel = useCallback(() => router.push("/"), [router]);

  const handleChangeAddrType = useCallback(
    (addressType: "old" | "load") =>
      setUserDefauleSet({ ...userDefaultSet, addressType }),
    [setUserDefauleSet, userDefaultSet]
  );

  return (
    <Container>
      <Header>
        <div className="lr-btn" onClick={handleGoBack}>
          <IconContainer
            icon={<IoArrowBackOutline />}
            size="22px"
            color="white"
            top={2.5}
          />
        </div>
        <Center>
          <Title>{houseListData?.name}</Title>
          <Type>{houseListData?.type}</Type>
          <Address>
            <Switch type={userDefaultSet.addressType}>
              <span
                className="btn l"
                onClick={() => handleChangeAddrType("old")}
              >
                지번
              </span>
              <span
                className="btn r"
                onClick={() => handleChangeAddrType("load")}
              >
                도로명
              </span>
            </Switch>
            {userDefaultSet.addressType === "old"
              ? houseListData?.address_old.full
              : houseListData?.address_load.full}
          </Address>
        </Center>
        <div className="lr-btn" onClick={handleCancel}>
          <IconContainer
            icon={<IoClose />}
            size="22px"
            color="white"
            top={2.5}
          />
        </div>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 95px;
`;

const Header = styled.header`
  width: 100%;
  height: 95px;

  position: fixed;
  z-index: 100;

  padding: 0 20px;

  border-radius: 15px 15px 0 0;

  display: flex;
  align-items: center;

  background: #0fae76;

  .lr-btn {
    cursor: pointer;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: white;

  font-weight: 500;
  font-size: 18px;
`;

const Type = styled.div`
  color: white;

  font-weight: 300;
  font-size: 12px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  font-weight: 200;
  font-size: 12px;
`;

const Switch = styled.div<IAddrSwitch>`
  border-radius: 5px;
  margin: 3px;

  .btn {
    width: 20px;

    padding: 0 3px;

    font-size: 11px;

    cursor: pointer;

    &.l {
      border-radius: 5px 0 0 5px;

      ${({ type }: IAddrSwitch) =>
        type === "old"
          ? css`
              background: #20c997;
            `
          : css`
              background: #0c7a53;
              color: #bbbbbb;
            `}
    }

    &.r {
      border-radius: 0 5px 5px 0;

      ${({ type }: IAddrSwitch) =>
        type === "load"
          ? css`
              background: #20c997;
            `
          : css`
              background: #0c7a53;
              color: #bbbbbb;
            `}
    }
  }
`;
