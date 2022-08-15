import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface SelectProps extends InputHTMLAttributes<any> {
  dataSources: { value: string; label: string }[];
}

export default function Select(props: SelectProps) {
  return (
    <Container>
      <SelectBox>
        {props.dataSources.map((dataSource) => (
          <option key={dataSource.value} value={dataSource.value}>
            {dataSource.label}
          </option>
        ))}
      </SelectBox>
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

const SelectBox = styled.select`
  width: 100%;
  height: 100%;

  border-radius: 10px;
  border: none;
  outline: none;

  background: white;
`;
