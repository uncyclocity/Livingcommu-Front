import styled from "styled-components"

export default function SideSearch () {
    return (
        <Container type="text" placeholder="주소 검색" />
    )
}

const Container = styled.input`
    width: 100%;
    height: 50px;

    padding: 20px;

    border: none;
    outline: none;

    font-size: 15px;

    background: #f9f9f9;

    ::placeholder {
        color: #aeaeb2;
    }
`