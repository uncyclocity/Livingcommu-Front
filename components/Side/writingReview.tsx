import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../Button";

interface ISideWritingReview {
  handleUpload: SubmitHandler<FieldValues>;
}

export default function SideWritingReview({
  handleUpload,
}: ISideWritingReview) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <TitleInput placeholder="제목을 입력하세요" {...register("title")} />
      {errors.title && <Error>제목을 입력하세요</Error>}
      <ContentInput placeholder="내용을 입력하세요" {...register("content")} />
      {errors.content && <Error>내용을 입력하세요</Error>}
      <Button
        inner="리뷰 등록"
        bgColor="#0fae76"
        textColor="white"
        paddingX="10px"
        paddingY="5px"
      />
    </form>
  );
}

const Error = styled.div`
  font-size: 15px;

  color: #a42020;
`;

const TitleInput = styled.input`
  width: 100%;

  padding: 5px 0;
  margin: 5px 0;

  border: none;
  border-bottom: 1.5px solid #0fae76;
  outline: none;

  font-size: 15px;
  font-weight: 500;
`;

const ContentInput = styled.textarea`
  width: 100%;
  min-height: 200px;

  margin: 5px 0;

  border: none;
  outline: none;

  font-size: 15px;
  font-weight: 300;
`;
