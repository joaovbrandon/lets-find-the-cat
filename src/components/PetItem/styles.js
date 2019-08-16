import styled from 'styled-components';
import { colors, fontSizes, screen } from '../../styles';
import petFallback from '../../assets/pet-fallback.png';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;

  ${({ itemStyle }) => {
    if (itemStyle === 'list') {
      return `
        justify-content: flex-start;
        align-items: center;
        border-top: 1px solid ${colors.divisor};
        padding: 15px 0;
      `;
    }

    return `
      align-self: stretch;
      flex: 1 0 30%;
      border: 2px solid ${colors.secondary};
      border-radius: 20px;
      margin: 0 1% 30px 1%;
      max-width: 30%;
    `;
  }}

  ${screen('max', 'lg')`
  ${({ itemStyle }) => {
    if (itemStyle !== 'card') return null;

    return `
      flex: 1 0 45%;
      max-width: 45%;
    `;
  }};
  `}

  ${screen('max', 'sm')`
  flex-direction: column;

  ${({ itemStyle }) => {
    if (itemStyle === 'list') return 'padding: 20px 0;';

    return `
      flex: 1 0 100%;
      max-width: 100%;
    `;
  }}
  `}
`;

export const Name = styled.h2`
  font-size: ${fontSizes.regular};
  color: ${colors.white};
  background: ${colors.nameOpacity};
  position: absolute;
  z-index: 9996;
  width: 100%;
  text-align: center;
  padding: 5px 15px;
`;

export const PictureContainer = styled.div`
  ${({ itemStyle }) => {
    if (itemStyle !== 'card') return null;

    return `
      position: relative;
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    `;
  }}

  &:after {
  ${({ itemStyle }) => {
    if (itemStyle !== 'card') return null;

    return `
      content: '';
      display: block;
      padding-bottom: 100%;
    `;
  }}
  }
`;

export const Picture = styled.img`
  background-color: ${colors.imgFallback};
  background: url(${petFallback});
  background-size: cover;

  ${({ itemStyle }) => {
    if (itemStyle === 'list') {
      return `
        border-radius: 50%;
        width: 80px;
        min-width: 80px;
        max-width: 80px;
        height: 80px;
        min-height: 80px;
        max-height: 80px;
      `;
    }

    return `
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
    `;
  }}

  ${screen('max', 'sm')`
  margin-bottom: 30px;
  `}
`;

export const AmountDonated = styled.span`
  position: absolute;
  background: ${colors.primary};
  color: ${colors.white};
  font-size: ${fontSizes.small};
  font-weight: bold;
  border-radius: 5px;
  width: 60px;

  ${({ itemStyle }) => {
    if (itemStyle === 'list') {
      return `
        right: 0;
        margin-top: -14px;
      `;
    }

    return `
      right: -1px;
      margin-top: 10px;
    `;
  }}

  ${screen('max', 'sm')`
  ${({ itemStyle }) => {
    if (itemStyle !== 'list') return null;

    return `
      right: unset;
      margin-top: 92px;
      margin-left: -32px;
    `;
  }}
  `}
`;

export const Found = styled(AmountDonated)`
  background: ${colors.found};

  ${({ itemStyle }) => {
    if (itemStyle === 'list') return 'margin-top: 14px;';
    return 'margin-top: 50%;';
  }}

  ${screen('max', 'sm')`
  ${({ itemStyle }) => {
    if (itemStyle !== 'list') return null;
    return 'margin-left: 32px;';
  }}
  `}
`;

export const Lost = styled(Found)`
  background: ${colors.lost};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ itemStyle }) => {
    if (itemStyle !== 'card') {
      return `
        width: 85%;
      `;
    }

    return `
      flex-direction: column;
      width: 100%;
      background: ${colors.white};
      padding: 10px;
    `;
  }}

  ${screen('max', 'sm')`
  flex-direction: column;
  `}
`;

export const Info = styled.span`
  color: ${colors.primary};
  line-height: 1.2;
  text-decoration: none;

  ${({ itemStyle }) => {
    if (itemStyle === 'list') {
      return `
        font-size: ${fontSizes.small};
        margin: 6px 0;
        flex: 1 0 30%;
        max-width: 30%;
      `;
    }

    return `
      font-size: ${fontSizes.regular};
      margin: 5px 0;
    `;
  }};

  ${screen('max', 'sm')`
    font-size: ${fontSizes.regular};
    margin: 5px 0;
    flex: 1 0;
    max-width: 100%;
  `}

  &:hover {
  ${({ as }) => {
    if (as === 'a') return 'text-decoration: underline;';
    return null;
  }};
  }
`;

export const Label = styled.strong`
  color: ${colors.secondary};

  ${({ itemStyle }) => {
    if (itemStyle !== 'card') {
      return `
        font-size: ${fontSizes.smaller};
        display: block;
      `;
    }

    return `font-size: ${fontSizes.small};`;
  }}

  ${screen('max', 'sm')`
  font-size: ${fontSizes.small};
  `}
`;

export const DonateContainer = styled.div`
  display: flex;
  background: ${colors.donateBtnBg};
  width: 100%;
  padding: 10px;
  align-items: center;
  min-height: 70px;
  line-height: 1.2;

  span {
    font-size: ${fontSizes.regular};
  }

  ${({ center }) => {
    if (center) return 'justify-content: center;';
    return 'justify-content: space-between;';
  }}
`;

export const CallBtn = styled.a`
  background: ${colors.callBtnBg};
  color: ${colors.white};
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  transition: .5s;

  &:hover {
    background: ${colors.callBtnBgHover};
  }
`;
