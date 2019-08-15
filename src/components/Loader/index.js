import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from '../../services';
import { Container, Message } from './styles';

function Loader({ loaderStyle, isLoading, message }) {
  useEffect(() => {
    if (loaderStyle !== 'general') return;

    if (isLoading) {
      HelperService.lockScroll();
    } else {
      HelperService.lockScroll(false);
    }
  }, [loaderStyle, isLoading]);

  return (
    <Container isLoading={isLoading} loaderStyle={loaderStyle}>
      {(isLoading || loaderStyle !== 'general')
        && (
        <>
          <FontAwesomeIcon icon={faSpinner} size="2x" spin />
          {loaderStyle === 'general' && <Message>{message}</Message>}
        </>
        )
      }
    </Container>
  );
}

Loader.defaultProps = {
  loaderStyle: 'general',
  isLoading: true,
  message: 'Loading...',
};

Loader.propTypes = {
  loaderStyle: PropTypes.string,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
  message: state.loader.message,
});

export default connect(
  mapStateToProps,
)(Loader);
