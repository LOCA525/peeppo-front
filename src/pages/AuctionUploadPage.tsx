import React, { useState } from "react";
import { styled } from "styled-components";
import { StBasicButton } from "../styles/BasicButton";
import ProductChoice from "../components/AuctionUploadPage/ProductChoice";

const AuctionUploadPage = () => {
  type ProductType = {
    time: string;
    product: string;
    limit: any;
  };

  const [productBid, setProductBid] = useState<ProductType>({
    time: "",
    product: "",
    limit: 0,
  });
  const { limit } = productBid;
  const bidPrice: number[] = [1000, 5000, 10000, 50000];
  const locateLimit = limit.toLocaleString();

  const onClickTwelveHourHandler = () => {
    setProductBid({ ...productBid, time: "30분" });
  };
  const onClickOneDayHandler = () => {
    setProductBid({ ...productBid, time: "1시간" });
  };
  const onClickThreeDayHandler = () => {
    setProductBid({ ...productBid, time: "3시간" });
  };

  const onClickAddPriceHandler = (item: number) => {
    setProductBid({ ...productBid, limit: parseInt(limit) + item });
  };

  const onClickRemovePriceHandler = () => {
    setProductBid({...productBid, limit: 0});
  };
  console.log("productBid", productBid);

  return (
    <PageLayoutContainer>
      <PageTitleContainer>START TO BID</PageTitleContainer>
      <KoreanTitle>경매 시작하기</KoreanTitle>
      <TextWrapper>
        <Text>
          * 드려요, 보세요 정보는 기존 물건을 주머니에 등록할 때 정보와 동일하게
          보여집니다.
        </Text>
        <Text>
          * 경매 등록 시 10포인트가 차감되며 입찰자가 없을 경우 글을 수정하거나
          삭제할 수 있습니다.
        </Text>
      </TextWrapper>
      <AuctionUploadContainer>
        <PeriodUploadContainer>
          <RequiredText>경매기간</RequiredText>
          <FirstWrapper>
            <ButtonWrapper>
              <Button
                buttonColor={productBid.time === "30분" ? "#575757" : "white"}
                style={{color: `${productBid.time === "30분" ? "white" : "#000000"}`}}
                onClick={onClickTwelveHourHandler}
              >
                30분
              </Button>
              <Button
                buttonColor={productBid.time === "1시간" ? "#575757" : "white"}
                style={{color: `${productBid.time === "1시간" ? "white" : "#000000"}`}}
                onClick={onClickOneDayHandler}
              >
                1시간
              </Button>
              <Button
                buttonColor={productBid.time === "3시간" ? "#575757" : "white"}
                style={{color: `${productBid.time === "3시간" ? "white" : "#000000"}`}}
                onClick={onClickThreeDayHandler}
              >
                3시간
              </Button>
            </ButtonWrapper>
            <Text>
              * 경매기간은 경매 시작을 기점으로 카운트다운되며 수정 할 수
              없습니다.
            </Text>
          </FirstWrapper>
        </PeriodUploadContainer>
        <ProductChoice />
        <LastLineContainer>
          <RequiredText>입찰 제한</RequiredText>
          <LineWrapper>
            <BidLimitWarpper>
              <InputWrapper>
                <BidLimitInput
                  type="text"
                  value={limit !== 0 ? locateLimit : ""}
                  placeholder="입력한 가치 이상의 물건만 입찰됩니다."
                />
                <RemoveBtn onClick={onClickRemovePriceHandler}>
                  <IconBox />
                  전체지우기
                </RemoveBtn>
              </InputWrapper>
              <ButtonWrapper>
                {bidPrice.map((item) => {
                  return (
                    <div key={item}>
                      <Button
                        buttonColor="#FDEAC2"
                        onClick={() => onClickAddPriceHandler(item)}
                      >
                        {item.toLocaleString()}
                      </Button>
                    </div>
                  );
                })}
              </ButtonWrapper>
            </BidLimitWarpper>
          </LineWrapper>
        </LastLineContainer>
      </AuctionUploadContainer>
    </PageLayoutContainer>
  );
};

const PageLayoutContainer = styled.div`
  width: 100%;
  display: grid;
`;

const PageTitleContainer = styled.div`
  width: 100%;
  font-family: "Lemon/Milk", sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 110%;
  padding: 0px 0px 16px 0px;
`;

const KoreanTitle = styled.div`
  width: 100%;
  font-family: "Pretendard";
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%;
  padding: 0px 0px 20px 0px;
`;

const Text = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: #808080;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 0px 0px 40px 0px;
`;

const AuctionUploadContainer = styled.div`
  width: 100%;
  margin: 0px 0px 40px 0px;
  border-top: 4px solid #181818;
  padding: 40px 0px;
`;

const PeriodUploadContainer = styled.div`
  width: 100%;
  padding: 0px 0px 30px 0px;
  display: flex;
  border-bottom: 2px solid #eaeaea;
`;

const UploadContainer = styled.div`
  width: 100%;
  padding: 30px 0px;
  display: flex;
  border-bottom: 2px solid #eaeaea;
`;

const RequiredText = styled.div`
  width: 192px;
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const FirstWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  gap: 16px;
  display: flex;
  align-items: center;
`;

const LineWrapper = styled.div`
  width: 100%;
  padding: 3px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BidLimitWarpper = styled.div`
  display: grid;
  gap: 30px;
  width: 100%;
`;

const BidLimitInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  border: 1px solid #adadad;
  border-radius: 5px;
  background-color: #fcfcfc;
`;

const LastLineContainer = styled.div`
  width: 100%;
  padding: 30px 0px;
  display: flex;
  border-bottom: 4px solid #181818;
`;

const Button = styled(StBasicButton)`
  border: 1px solid #222020;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RemoveBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: #ADADAD;
  min-width: 101px;
  cursor: pointer;
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  background-color: #D9D9D9;
`;

export default AuctionUploadPage;
