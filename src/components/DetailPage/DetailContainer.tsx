import React, { useEffect, useRef, useState } from 'react'
import { styled } from "styled-components";
import ArrowLeft from '../../assets/images/arrowleft.png'
import ArrowRight from '../../assets/images/arrowright.png'
import DetailInfo from './DetailInfo';

const DetailContainer = ({ data } : any) => {

  const arrImages : string[] = data.data.info.goodsResponseDtoList.images;
  
  const divRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const imageWidth: number = 464;
  const SlideRange: number = currentImg * imageWidth;

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.transition = "all 0.5s ease-in-out";
      divRef.current.style.transform = `translateX(-${SlideRange}px)`;
    }
  }, [SlideRange]);

  const moveToNextBtn = () => {
    if (currentImg === (arrImages.length - 1)) return;
    setCurrentImg(currentImg + 1);
  };

  const moveToPrevBtn = () => {
    if (currentImg === 0) return;
    setCurrentImg(currentImg - 1);
  };

  const RequestStatus = () => {
    if (data.data.info.goodsResponseDtoList.goodsStatus === "TRADING") {
      return <RequestCondition>
        <GoodsCondition>
          <Circle />
          거래중
        </GoodsCondition>
      </RequestCondition>
    } else if (data.data.info.goodsResponseDtoList.goodsStatus === "SOLDOUT") {
      return <Finished>거래완료</Finished>
    } else if (data.data.info.goodsResponseDtoList.goodsStatus === "ONAUCTION"
      || data.data.info.goodsResponseDtoList.goodsStatus === "BIDDING") {
      return <RequestCondition>
        <GoodsCondition>
          <Circle style={{backgroundColor: "#58ABF7"}} />
          경매중
        </GoodsCondition>
      </RequestCondition>
    } else {
      return
    };
  };

  return (
    <LayoutContainer>
      <ImageOutContainer>
        {RequestStatus()}
        <SlideBtnWrapper>
          <SlideButton
            onClick={moveToPrevBtn}
            style={{
              opacity: `${(currentImg === 0 || arrImages.length === 1) ? "0" : "0.4"}`,
              cursor: `${(currentImg === 0 || arrImages.length === 1) ? "default" : "pointer"}`
            }}>
            <img src={ArrowLeft} alt=''/>
          </SlideButton>
          <SlideButton
            onClick={moveToNextBtn}
            style={{
              opacity: `${(arrImages.length === 1 || currentImg === (arrImages.length - 1)) ? "0" : "0.4"}`,
              cursor: `${(arrImages.length === 1 || currentImg === (arrImages.length - 1)) ? "default" : "pointer"}`
            }}>
          <img src={ArrowRight} alt=''/>
          </SlideButton>
        </SlideBtnWrapper>
        <SlideWrapper ref={divRef}>
          {arrImages.map((item) => <ImageBox src={item}/>)}
        </SlideWrapper>
        <SlidePageBarWrapper>
          {arrImages.map((item) =>
            (currentImg === arrImages.indexOf(item))
              ? <SlidePageBar backgroundcolor='#fff'></SlidePageBar>
              : <SlidePageBar backgroundcolor='#9e9e9e'></SlidePageBar>
            )}
        </SlidePageBarWrapper>
      </ImageOutContainer>
      <DetailInfo data={data} />
    </LayoutContainer>
  )
};

const LayoutContainer = styled.div`
    padding: 60px 0px 87px 0px;
    display: flex;
    gap: 112px;
    width: 100%;

    @media screen and (max-width: 1136px) {
      display: grid;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    @media screen and (max-width: 375px) {
      display: grid;
      justify-content: center;
      align-items: center;
      gap: 20px;
      max-width: 375px;
    }   
`;

// const EmptyBox = styled.div<{ src: string }>`
//     width: 100%;
//     height: 100%;
//     background-color: #D9D9D9;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 375px) {
      max-width: 100%;
    }
`;

const ImageBox = styled.div<{ src : string }>`
  min-width: 464px;
  height: 464px;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media screen and (max-width: 375px) {
    max-width: 375px;
  }
`;

const ImageOutContainer = styled.div`
  min-width: 464px;
  height: 464px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1136px) {
    margin: 0px;
    width: 464px;
  }
  @media screen and (max-width: 375px) {
    max-width: 375px;
  }
`;

const SlideBtnWrapper = styled.div`
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: space-between;
    z-index: 200;
    @media screen and (max-width: 375px) {
    max-width: 375px;
  }
`;

const SlideButton = styled.div`
    width: 48px;
    height: 48px;
    background-color: #222020;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 200;

    &:hover {
        background-color: #b3b3b3;
        opacity: 0.7;  
    }
`;

const SlidePageBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  position: absolute;
  bottom: 20px;
  gap: 16px;
`;

const SlidePageBar = styled.div<{ backgroundcolor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${(props) => props.backgroundcolor};
  opacity: 0.8;
`;

const RequestCondition = styled.div`
  width: 464px;
  height: 464px;
  position: absolute;
  border-radius: 10px;
  padding: 20px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.50) 13.54%, rgba(0, 0, 0, 0.20) 28.13%, rgba(0, 0, 0, 0.00) 39.06%);
  z-index: 198;
`;

const GoodsCondition = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: 700;
  line-height: 150%;
  position: absolute;
  z-index: 199;
  color: #FCFCFC;
`;

const Circle = styled.div`
  background-color: #EC8D49;
  border-radius: 100%;
  width: 24px;
  height: 24px;
`;

const Finished = styled.div`
  width: 464px;
  height: 464px;
  border-radius: 10px;
  background-color: #00000080;
  position: absolute;
  z-index: 199;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  font-size: 32px;
  font-weight: 800;
  line-height: 150%;
  color: #FCFCFC;
`;

export default DetailContainer;