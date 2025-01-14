import React, { useEffect } from "react";
import { styled } from "styled-components";
import eyeImage from "../assets/images/eye.svg";
import HorizontalLine from "../components/common/HorizontalLine";
import FilterButton from "../components/common/FilterButton";
import Paging from "../components/common/Paging/Paging";
import { StTitle } from "../styles/TitleFont";
import ItemCardList from "../components/common/ItemCardList";
import { useQuery } from "react-query";
import { getGoodsApi } from "../api/goods";
import { pagination } from "../store/pagination";
import { useRecoilValue } from "recoil";
import { filterAsc, filterCategory } from "../store/filterCategory";
import AscFilterButton from "../components/common/AscFilterButton";
import LoadingSpinner from "../components/common/LoadingSpinner";

const TradeListPage = () => {
  const currentPage = useRecoilValue(pagination);
  const currentCategory = useRecoilValue(filterCategory);
  const currentAsc = useRecoilValue(filterAsc);
  const { isLoading, error, data } = useQuery(
    ["tradeListPageData", currentPage, currentCategory, currentAsc],
    () => getGoodsApi(currentPage, currentCategory, currentAsc),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) return <LoadingSpinner />;
  console.log("물물교환페이지데이터", data);
  if (error) {
    console.log(error);
  }

  return (
    <TradeListPageContainer>
      <TitleContainer>
        <TitleImage src={eyeImage} />
        <TitleText marginbottom="0" textalign="center">
          POCKET TRADE
        </TitleText>
      </TitleContainer>
      <HorizontalLine />
      <AscFilterButton />
      <FilterButton />
      <ItemCardList data={data?.data.content} allList={true} />
      <Paging />
    </TradeListPageContainer>
  );
};

const TradeListPageContainer = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
`;
const TitleImage = styled.img`
  width: 66px;
  height: 54px;
  margin-bottom: 16px;
`;

const TitleText = styled(StTitle)`
  color: var(--orange-orange-100, #ec8d49);
`;

export default TradeListPage;
