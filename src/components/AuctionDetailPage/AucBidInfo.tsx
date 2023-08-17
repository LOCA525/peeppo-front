import React from 'react'
import { styled } from 'styled-components';
import AucBidCard from './AucBidCard';

const AucBidInfo = ({ data } : any) => {
  return (
    <InfoContainer>
        <InfoTextContainer>
            <CardListContainer>
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
                <AucBidCard />
            </CardListContainer>
        </InfoTextContainer>
    </InfoContainer>
)
};

const InfoContainer = styled.div`
width: 100%;
border-top: 2px solid #000;
border-bottom: 2px solid #D9D9D9;
margin: 42px 0px 60px 0px;
padding: 0px 0px 93px 0px;
display: grid;
`;

const InfoTextContainer = styled.div`
padding: 60px 0px 0px 0px;
width: 100%;
`;

const CardListContainer = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
gap: 16px;
`;

export default AucBidInfo;