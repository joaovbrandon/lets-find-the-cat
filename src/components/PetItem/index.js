import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { Creators as DonationsActions } from '../../store/ducks/donations';
import { currencySymbol } from '../../configs';
import { HelperService } from '../../services';
import Modal from '../Modal';
import Input from '../Input';
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
  DonateForm,
  Currency,
  DonateButton,
} from './styles';

const schema = Yup.object().shape({
  amountToDonate: Yup.number()
    .transform((value, originalValue) => {
      if (!originalValue) return 0;
      return parseFloat(originalValue.replace(',', '.'));
    })
    .max(10, `You may donate up to ${HelperService.currencyFormat(10)}`)
    .min(0.1, `Minimum donate is ${HelperService.currencyFormat(0.1)}`),
});

function PetItem({
  itemStyle, pet, user, amountDonated, addUserDonation, isLoading,
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

  const [modalDonateOpened, setModalDonateOpened] = useState(false);
  const [amountToDonate, setAmountToDonate] = useState('0,00');
  const [animateWhenDonate, setAnimateWhenDonate] = useState(false);
  const [donationAnimate, setDonationAnimate] = useState(false);

  useEffect(() => {
    if (itemStyle === 'card' && !found && !amountDonated && !animateWhenDonate) setAnimateWhenDonate(true);
    if (animateWhenDonate && amountDonated) setDonationAnimate(true);
  }, [
    itemStyle, found, amountDonated, animateWhenDonate, setAnimateWhenDonate, setDonationAnimate,
  ]);

  useEffect(() => {
    setAmountToDonate('0,00');
  }, [modalDonateOpened, setAmountToDonate]);

  const renderInfo = (label, info, props) => (
    <Info itemStyle={itemStyle} {...props}>
      <Label itemStyle={itemStyle}>{label}</Label>
      {` ${info}`}
    </Info>
  );

  const amountToDonateFormat = ({ target }) => {
    let { value } = target;
    value = value.replace(/([^0-9])/g, '').replace(/^0+/g, '');

    if (value.length === 5) return;
    if (value.length === 0) value = '0,00';
    if (value.length === 1) value = `0,0${value}`;
    if (value.length === 2) value = `0,${value}`;
    if (value.length === 3) value = value.replace(/([0-9])([0-9])([0-9])/, '$1,$2$3');
    if (value.length === 4) value = value.replace(/([1-9])([0-9])([0-9])([0-9])/, '$1$2,$3$4');

    setAmountToDonate(value);
  };

  return (
    <Container itemStyle={itemStyle} animation={donationAnimate}>
      {itemStyle === 'card' && <Name>{name}</Name>}

      <PictureContainer
        itemStyle={itemStyle}
        hasLink={itemStyle === 'card' && !amountDonated && !found && user}
        onClick={() => itemStyle === 'card' && !amountDonated && !found && user && setModalDonateOpened(true)}
      >
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
            {
              (!amountDonated && !found && user)
                && <Button type="button" onClick={() => setModalDonateOpened(true)}>Donate</Button>
            }
          </DonateContainer>

          <CallBtn href={`tel:${owner.phoneUnformatted}`}>
            {` ${owner.phone} `}
            Call
          </CallBtn>

          {
            (!amountDonated && !found && user)
            && (
              <Modal
                opened={modalDonateOpened}
                setOpened={setModalDonateOpened}
                title={`Donate to ${name}`}
                description={`You may donate up to ${HelperService.currencyFormat(10)} to help find this pet!`}
                maxWidth="350px"
              >
                <Picture src={pictureUrl} alt={name} itemStyle="modal" />

                <InfoContainer itemStyle={itemStyle}>
                  {renderInfo('Lost in', lostDate)}
                  {renderInfo('Owner', `${owner.firstName} ${owner.lastName}`)}
                  {renderInfo('Location', locality)}
                </InfoContainer>

                {
                  modalDonateOpened
                  && (
                    <DonateForm
                      schema={schema}
                      onSubmit={
                        data => addUserDonation(pet.id, user.id, data.amountToDonate)
                      }
                    >
                      <Input
                        name="amountToDonate"
                        type="text"
                        placeholder="0,00"
                        inputStyle={2}
                        onChange={amountToDonateFormat}
                        value={amountToDonate}
                        icon={<Currency>{currencySymbol}</Currency>}
                      />
                      <DonateButton type="submit" disabled={isLoading}>Donate</DonateButton>
                    </DonateForm>
                  )
                }
              </Modal>
            )
          }
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
    id: PropTypes.string.isRequired,
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
  addUserDonation: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.loader.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators(DonationsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PetItem);
