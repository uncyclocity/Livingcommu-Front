import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface CheckBoxInputProps extends InputHTMLAttributes<any> {
  label: string;
}

export default function CheckBoxInput(props: CheckBoxInputProps) {
  return (
    <Container>
      <CheckBox type="checkbox" {...props} />
      {props.label}
    </Container>
  );
}

const Container = styled.label`
  font-size: 12px;
`;

const CheckBox = styled.input``;
