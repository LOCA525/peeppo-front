import React, { useEffect, useState } from "react";
import {
  CardContainer,
  Filter,
  FilterContainer,
  FilterdropdownMenuContainer,
  TradeRequestListContainer,
} from "../TradeRequestPage/GetRequestList";
import {
  ArrowImg,
  GetRequest,
  RequestIngNumber,
  RequestStateContainer,
  RequestStateNumber,
  SendRequest,
  TabContainer,
} from "../../pages/TradeRequestPage";
import arrow from "../../assets/icon/arrow.png";
import AuctionRequestCard from "./AuctionRequestCard";
import { DotImg } from "../TradeRequestPage/TradeRequestCard";
import bluedot from "../../assets/icon/bluedot.png";
import blackdot from "../../assets/icon/blackdot.png";
import { useQuery } from "react-query";
import { getMyAuctionCheckApi } from "../../api/acution";
import AuctionFilterDropdownMenu from "./AuctionFilterDropdownMenu";
import { useRecoilValue } from "recoil";
import { myAuctionFilter } from "../../store/filterCategory";
import SellerPickModal from "../AuctionDetailPage/SellerPickModal";
import SuccessBIdModal from "../AuctionDetailPage/SuccessBIdModal";
import Paging from "../common/Paging/Paging";
import { pagination } from "../../store/pagination";
import LoadingSpinner from "../common/LoadingSpinner";
import { FilterToEnum } from "../../utils/EnumFilter";
import DetailGoodsModal from "../TradeRequestPage/DetailGoodsModal";

interface MyAuctionListProps {
  filterTap: any;
  auctionFilterOpen: boolean;
  dropdownMenu: string;
  setAuctionFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdownMenu: React.Dispatch<React.SetStateAction<string>>;
  setFilterTap: React.Dispatch<
    React.SetStateAction<{ myAuctionTap: boolean; bidAuctionTap: boolean }>
  >;
}

const MyAuctionList: React.FC<MyAuctionListProps> = ({
  auctionFilterOpen,
  filterTap,
  dropdownMenu,
  setAuctionFilterOpen,
  setDropdownMenu,
  setFilterTap,
}) => {

  const currentPage = useRecoilValue(pagination);
  const auctionFilter = useRecoilValue(myAuctionFilter);
  const [detailData, setDetailData] = useState<any>();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [sellerPicks, setSellerPicks] = useState<{
    pickModal: boolean,
    successBidModal: boolean
  }>({
    pickModal: false,
    successBidModal: false,
  });
  const { pickModal, successBidModal } = sellerPicks;

  // interface Kind {
  //   filter: string | null;
  //   name: string;
  // }

  const newFilter = FilterToEnum(auctionFilter);

  console.log("filter", newFilter);

  const { data, isLoading, error }: any = useQuery(
    ["getMyAuctionCheckData", currentPage, newFilter],
    () => getMyAuctionCheckApi(currentPage, newFilter)
  );

  const [testListResponseDto, setTestListResponseDto] = useState<any>();

  if (isLoading) return <LoadingSpinner />;
  console.log("내경매현황 데이터", data);
  if (error) {
    console.log(error);
  }
  console.log(data, "내 경매 현황 데이터");
  const myAuctionOnclick = () => {
    setFilterTap({
      myAuctionTap: false,
      bidAuctionTap: true,
    });
  };
  console.log("경매현황페이지 내경매 데이터", data);

  return (
    <div>
      <TabContainer>
        <GetRequest>내 경매</GetRequest>
        <SendRequest onClick={myAuctionOnclick}>입찰 경매</SendRequest>
      </TabContainer>
      <RequestStateContainer>
        <RequestStateNumber>
          <DotImg src={bluedot} />
          경매중 10
        </RequestStateNumber>
        <RequestIngNumber>
          <DotImg src={blackdot} />
          경매완료 2
        </RequestIngNumber>
      </RequestStateContainer>
      <TradeRequestListContainer>
        <FilterContainer>
          <Filter
            onClick={() => {
              setAuctionFilterOpen(!auctionFilterOpen);
            }}
          >
            <div>{auctionFilter}</div>
            {/* {dropdownMenu} */}
            <ArrowImg src={arrow} />
          </Filter>

          {auctionFilterOpen && (
            <FilterdropdownMenuContainer>
              <AuctionFilterDropdownMenu
                auctionFilterOpen={auctionFilterOpen}
                setAuctionFilterOpen={setAuctionFilterOpen}
                setDropdownMenu={setDropdownMenu}
              />
            </FilterdropdownMenuContainer>
          )}
        </FilterContainer>

        <CardContainer>
          {data?.data.content.length > 0 &&
            data?.data.content?.map((item: any) => {
              return <AuctionRequestCard
                key={item.auctionId}
                item={item}
                setDto={setTestListResponseDto}
                setSellerPicks={setSellerPicks}
                sellerPicks={sellerPicks}
                setDetailModalOpen={setDetailModalOpen}
                setDetailData={setDetailData}
              />;
            })}
        </CardContainer>
        {pickModal
            && <SellerPickModal
              setSellerPicks={setSellerPicks}
              sellerPicks={sellerPicks}
              auctionId={testListResponseDto}
          />}
          {successBidModal
            && <SuccessBIdModal
              setSellerPicks={setSellerPicks}
              sellerPicks={sellerPicks}
              auctionId={testListResponseDto}
          />}
          {detailModalOpen
            && <DetailGoodsModal
              detailData={detailData}
              detailModalOpen={detailModalOpen}
              setDetailModalOpen={setDetailModalOpen}
            />}
          <Paging />
      </TradeRequestListContainer>
    </div>
  );
};

export default MyAuctionList;
