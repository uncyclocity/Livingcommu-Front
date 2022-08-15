import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export default function TextInput(props: InputHTMLAttributes<any>) {
  return (
    <Container>
      <Input {...props} />
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 40px;

  display: flex;
  align-items: center;

  margin: 15px 0;
  padding: 0 5px;

  border-radius: 5px;
  border: 2px solid #0fae76;
  outline: none;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;

  border-radius: 10px;
  border: none;
  outline: none;
`;
