/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Container,
  StockTitleContainer,
  Title,
  StockName,
  StockTicker,
  StockInfo,
  InfoContainer,
  InfoText,
  ValueData,
  RentabilityData,
  RentabilityDataContainer,
} from './styles';
import Favorite from '../../assets/heart.svg';
import NotFavorite from '../../assets/heartoutline.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {currencyFormatToBRL} from '../../utils/currencyFormatToBRL';
import {percentFormat} from '../../utils/percentFormat';
import {ProfitabilityArrow} from '../ProfitabilityArrow';

interface Stock {
  id: number;
  name: string;
  ticker: string;
  minimumValue: number;
  profitability: number;
  isFavorite: boolean;
  sortFavorites: () => void;
  setFavorite: (id: number) => void;
}

export function StockCard({
  id,
  name,
  ticker,
  minimumValue,
  profitability,
  sortFavorites,
  setFavorite,
}: Stock) {
  const [isFavoriteStock, setIsFavoriteStock] = useState(false);
  const isIncrease = profitability > 0;

  async function handleFavoriteButton() {
    setIsFavoriteStock(state => !state);
    await setFavorite(id);
    sortFavorites();
  }

  return (
    <Container>
      <StockTitleContainer>
        <Title>
          <StockName>{name}</StockName>
          <StockTicker>{ticker}</StockTicker>
        </Title>
        <TouchableOpacity onPress={handleFavoriteButton}>
          {isFavoriteStock ? (
            <Favorite width={24} height={24} />
          ) : (
            <NotFavorite width={24} height={24} />
          )}
        </TouchableOpacity>
      </StockTitleContainer>
      <StockInfo>
        <InfoContainer>
          <InfoText>Valor mínimo:</InfoText>
          <ValueData>{currencyFormatToBRL(minimumValue)}</ValueData>
        </InfoContainer>
        <InfoContainer style={{marginTop: 15}}>
          <InfoText>Rentabilidade:</InfoText>
          <RentabilityDataContainer>
            <ProfitabilityArrow isIncrease={isIncrease} />
            <RentabilityData increase={isIncrease}>
              {percentFormat(profitability)}
            </RentabilityData>
          </RentabilityDataContainer>
        </InfoContainer>
      </StockInfo>
    </Container>
  );
}
