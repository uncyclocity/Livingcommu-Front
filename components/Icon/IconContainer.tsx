import styled, { css } from "styled-components";

interface IIconContainer {
  icon: React.ReactNode;
  size: string;
  top: number;
  color?: string;
}

interface IContainerStyle {
  size: string;
  color?: string;
  top: number;
}

export default function IconContainer({
  icon,
  size,
  color,
  top,
}: IIconContainer) {
  return (
    <Container size={size} color={color} top={top}>
      {icon}
    </Container>
  );
}

const Container = styled.span<IContainerStyle>`
  max-width: ${({ size }: { size: string }) => size};
  max-height: ${({ size }: { size: string }) => size};

  position: relative;
  top: ${({ top }: { top: number }) => top}px;

  display: inline-block;

  ${({ color }: { color?: string }) =>
    color &&
    css`
      color: ${color};
    `};

  font-size: ${({ size }: { size: string }) => size};
`;
