import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as DonationsActions } from '../../store/ducks/donations';
import { HelperService } from '../../services';
import Button from '../Button';
import {
  Container,
  Name,
  PictureContainer,
  Picture,
  Found,
  Lost,
  AmountDonated,
  InfoContainer,
  Info,
  Label,
  DonateContainer,
  CallBtn,
} from './styles';

function PetItem({
  itemStyle, pet, user, amountDonated,
}) {
  const {
    found,
    pictureUrl,
    name,
    amountCollected,
    locality,
    lostDate,
    owner,
  } = pet;

  const renderInfo = (label, info, props) => (
    <Info itemStyle={itemStyle} {...props}>
      <Label itemStyle={itemStyle}>{label}</Label>
      {` ${info}`}
    </Info>
  );

  return (
    <Container itemStyle={itemStyle}>
      {itemStyle === 'card' && <Name>{name}</Name>}

      <PictureContainer itemStyle={itemStyle}>
        <Picture src={pictureUrl} alt={name} itemStyle={itemStyle} />
      </PictureContainer>

      {itemStyle === 'list' && <AmountDonated found={found} itemStyle={itemStyle}>{amountDonated}</AmountDonated>}

      {
        found
          ? <Found itemStyle={itemStyle}>Found!</Found>
          : <Lost itemStyle={itemStyle}>Lost!</Lost>
      }

      <InfoContainer itemStyle={itemStyle}>
        {itemStyle === 'list' && renderInfo('Name', name)}
        {renderInfo('Lost in', lostDate)}
        {renderInfo('Owner', `${owner.firstName} ${owner.lastName}`)}
        {renderInfo('Location', locality)}
        {itemStyle === 'list' && renderInfo('Amount Collected', amountCollected)}
        {itemStyle === 'list' && renderInfo('Phone', owner.phone, { as: 'a', href: `tel:${owner.phoneUnformatted}` })}
        {(itemStyle === 'card' && user) && renderInfo('You donated', amountDonated || HelperService.currencyFormat(0))}
      </InfoContainer>

      {
        itemStyle === 'card'
        && (
        <>
          <DonateContainer center={amountDonated || found || !user}>
            <span>
              <strong>{`${amountCollected} `}</strong>
              donated
            </span>
            {(!amountDonated && !found && user) && <Button type="button">Donate</Button>}
          </DonateContainer>

          <CallBtn href={`tel:${owner.phoneUnformatted}`}>
            {` ${owner.phone} `}
            Call
          </CallBtn>
        </>
        )
      }
    </Container>
  );
}

PetItem.defaultProps = {
  itemStyle: 'card',
  user: null,
  amountDonated: null,
};

PetItem.propTypes = {
  itemStyle: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  pet: PropTypes.shape({
    found: PropTypes.bool.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amountCollected: PropTypes.string.isRequired,
    locality: PropTypes.string.isRequired,
    lostDate: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      phoneUnformatted: PropTypes.number.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  amountDonated: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(DonationsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PetItem);
