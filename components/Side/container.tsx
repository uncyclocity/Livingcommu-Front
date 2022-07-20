import styled from "styled-components";

interface ISideContainer {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export default function SideContainer({ header, children }: ISideContainer) {
  return (
    <Container>
      {header}
      <Outer>{children}</Outer>
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
  min-height: 200px;

  margin: 30px;

  display: block;
  border-radius: 15px;

  position: absolute;
  z-index: 1000;

  background: white;
  box-shadow: 2px 2px 10px #b8b8b8;
`;

const Outer = styled.div`
  padding: 5px 20px;
`;
