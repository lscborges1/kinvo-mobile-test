/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Container,
  FundTitleContainer,
  Title,
  FundName,
  FundType,
  FundStatusContainer,
  FundStatusText,
  FundInfo,
  InfoContainer,
  InfoText,
  ValueData,
  ProfitabilityData,
  ProfitabilityDataContainer,
  FundsProfitabilityArrow,
} from './styles';

import {currencyFormatToBRL} from '../../utils/currencyFormatToBRL';
import {percentFormat} from '../../utils/percentFormat';
import {StarsRating} from '../StarsRating';
import {formatShortName} from '../../utils/nameFormat';

interface FundCardProps {
  name: string;
  type: string;
  minimumValue: number;
  rating: number;
  profitability: number;
  status: number;
}

export function FundCard({
  name,
  type,
  minimumValue,
  rating,
  profitability,
  status,
}: FundCardProps) {
  const isIncrease = profitability > 0;
  const isNew = status === 1;
  const isClosed = status === 2;
  const shortName = formatShortName(name);

  return (
    <Container isClosed={isClosed}>
      <FundTitleContainer>
        <Title>
          <FundName isClosed={isClosed}>{shortName}</FundName>
          {isNew && (
            <FundStatusContainer>
              <FundStatusText>Novo</FundStatusText>
            </FundStatusContainer>
          )}
          {isClosed && (
            <FundStatusContainer
              style={{backgroundColor: '#818181', width: 75}}>
              <FundStatusText>Fechado</FundStatusText>
            </FundStatusContainer>
          )}
        </Title>
        <FundType isClosed={isClosed}>{type}</FundType>
      </FundTitleContainer>
      <FundInfo>
        <InfoContainer>
          <InfoText isClosed={isClosed}>Classificação:</InfoText>
          <StarsRating rating={rating} isClosed={isClosed} />
        </InfoContainer>
        <InfoContainer>
          <InfoText isClosed={isClosed}>Valor mínimo:</InfoText>
          <ValueData isClosed={isClosed}>
            {currencyFormatToBRL(minimumValue)}
          </ValueData>
        </InfoContainer>
        <InfoContainer>
          <InfoText isClosed={isClosed}>Rentabilidade:</InfoText>
          <ProfitabilityDataContainer>
            <FundsProfitabilityArrow
              isClosed={isClosed}
              isIncrease={isIncrease}
            />
            <ProfitabilityData isClosed={isClosed} isIncrease={isIncrease}>
              {percentFormat(profitability)}
            </ProfitabilityData>
          </ProfitabilityDataContainer>
        </InfoContainer>
      </FundInfo>
    </Container>
  );
}
