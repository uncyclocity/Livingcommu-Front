import styled, { css } from "styled-components";

interface IIconContainer {
  icon: React.ReactNode;
  size: string;
  color?: string;
}

interface IContainerStyle {
  size: string;
  color?: string;
}

export default function IconContainer({ icon, size, color }: IIconContainer) {
  return (
    <Container size={size} color={color}>
      {icon}
    </Container>
  );
}

const Container = styled.span<IContainerStyle>`
  max-width: ${({ size }: { size: string }) => size};
  max-height: ${({ size }: { size: string }) => size};

  position: relative;
  top: 2.5px;

  display: inline-block;

  ${({ color }: { color?: string }) =>
    color &&
    css`
      color: ${color};
    `};

  font-size: ${({ size }: { size: string }) => size};
`;
