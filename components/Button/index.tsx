import styled, { css } from "styled-components";
import { darken } from "polished";
import { ButtonHTMLAttributes } from "react";

interface IButtonCnt {
  bgColor: string;
  textColor: string;
  paddingX: string;
  paddingY: string;
}

interface IButton extends IButtonCnt, ButtonHTMLAttributes<HTMLButtonElement> {
  inner: React.ReactElement | string;
}

export default function Button({
  inner,
  bgColor,
  textColor,
  paddingX,
  paddingY,
  ...props
}: IButton) {
  return (
    <Container
      bgColor={bgColor}
      textColor={textColor}
      paddingX={paddingX}
      paddingY={paddingY}
      {...props}
    >
      {inner}
    </Container>
  );
}

const Container = styled.button<IButtonCnt>`
  ${({ paddingX, paddingY }: { paddingX: string; paddingY: string }) =>
    css`
      padding: ${paddingY} ${paddingX};
    `}

  border-radius: 5px;
  border: none;

  cursor: pointer;

  color: ${({ textColor }: { textColor: string }) => textColor};

  &:hover {
    transition: 0.15s all ease-in;
    background: ${({ bgColor }: { bgColor: string }) => darken(0.1, bgColor)};
  }

  &:not(:hover) {
    transition: 0.15s all ease-in;
    background: ${({ bgColor }: { bgColor: string }) => bgColor};
  }
`;
