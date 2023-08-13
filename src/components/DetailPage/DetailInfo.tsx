import React, { useState } from "react";
import { StBasicButton } from "../../styles/BasicButton";
import { styled } from "styled-components";

const DetailInfo = () => {
  const [chatting, setChatting] = useState(false);

  const onClickAcceptHandler = () => {
    setChatting(true);
  };

  const onClickChatting = () => {
    setChatting(false);
  };

  return (
    <InfoContainer>
      <InfoTitle>스타벅스 교환권 30,000원</InfoTitle>
      <UserNameContainer>
        <ColorText>핍포님의 주머니</ColorText>
        <BoxWrapper>
          <ColorText>핍포님의 주머니</ColorText>
          <SmallBox />
        </BoxWrapper>
      </UserNameContainer>
      <UserNameContainer style={{ border: "none", paddingTop: "16px" }}>
        <LeftWrapper>
          <Wrapper>
            <BigBox></BigBox>
            <ColorText>00</ColorText>
          </Wrapper>
          <Wrapper>
            <BigBox></BigBox>
            <ColorText>00일 전</ColorText>
          </Wrapper>
        </LeftWrapper>
        <LeftWrapper>
          <Wrapper>
            <BigBox></BigBox>
            <ColorText>신고하기</ColorText>
          </Wrapper>
        </LeftWrapper>
      </UserNameContainer>
      <TextContainer>
        <TextLine>
          <ColorText style={{ paddingRight: "40px" }}>카테고리</ColorText>
          <Text>기프티콘</Text>
        </TextLine>
        <TextLine>
          <ColorText style={{ paddingRight: "40px" }}>상품상태</ColorText>
          <Text>최상</Text>
        </TextLine>
        <TextLine>
          <ColorText style={{ paddingRight: "40px" }}>거래지역</ColorText>
          <Text></Text>
        </TextLine>
        <TextLine>
          <ColorText style={{ paddingRight: "40px" }}>거래방법</ColorText>
          <Text>직거래</Text>
        </TextLine>
        <TextLine>
          <ColorText style={{ paddingRight: "40px" }}>상품태그</ColorText>
          <Text>#스타벅스 #기프티콘 #교환권</Text>
        </TextLine>
      </TextContainer>
      <ColorText>*상대방이 교환신청을 수락하여 채팅이 가능해요!</ColorText>
      <ButtonWrapper>
        <StBasicButton
          color="white"
          borderColor="#717171"
          buttonColor="#717171"
          fontWeight="400"
          style={{ color: "white" }}
          onClick={onClickAcceptHandler}
        >
          교환신청
        </StBasicButton>
        <StBasicButton
          color="white"
          borderColor="#717171"
          buttonColor="#717171"
          fontWeight="400"
          style={{ color: "white" }}
        >
          찜하기
        </StBasicButton>
        {chatting ? (
          <StBasicButton
            color="white"
            borderColor="#717171"
            buttonColor="#717171"
            fontWeight="400"
            style={{ color: "white" }}
            onClick={onClickChatting}
          >
            채팅하기
          </StBasicButton>
        ) : (
          <StBasicButton
            color="white"
            borderColor="#E2E2E2"
            buttonColor="#E2E2E2"
            fontWeight="400"
            style={{ color: "#999999" }}
            onClick={onClickChatting}
          >
            채팅하기
          </StBasicButton>
        )}
      </ButtonWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 834px) {
    width: 100%;
    display: grid;
  }
`;

const InfoTitle = styled.div`
  font-family: "Pretendard";
  font-size: 32px;
  font-weight: 800;
  line-height: 150%;
`;

const UserNameContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 0px 16px 0px;
  border-bottom: 2px solid #d9d9d9;
`;

const Text = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

const ColorText = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: #717171;
`;

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SmallBox = styled.div`
  width: 24px;
  height: 24px;
  background-color: #d9d9d9;
`;

const BigBox = styled.div`
  width: 32px;
  height: 32px;
  background-color: #d9d9d9;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: grid;
  padding: 2px 0px 52px 0px;
`;

const TextLine = styled.div`
  padding: 12px 0px 0px 0px;
  display: flex;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  padding: 10px 0px 0px 0px;
`;

export default DetailInfo;
