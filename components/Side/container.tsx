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
  width: 360px;
  min-height: 200px;
  max-height: calc(100vh - 288px);

  overflow-y: auto;
  scrollbar-width: none;

  margin-bottom: 15px;

  display: block;
  border-radius: 15px;

  background: white;
  box-shadow: 2px 2px 10px #b8b8b8;
`;

const Outer = styled.div`
  padding: 0 20px 10px 20px;
`;
