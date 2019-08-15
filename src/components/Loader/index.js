import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from '../../services';
import { Container, Message } from './styles';

function Loader({ isLoading, message }) {
  useEffect(() => {
    if (isLoading) {
      HelperService.lockScroll();
    } else {
      HelperService.lockScroll(false);
    }
  }, [isLoading]);

  return (
    <Container isLoading={isLoading}>
      {isLoading
        && (
        <>
          <FontAwesomeIcon icon={faSpinner} size="2x" spin />
          <Message>{message}</Message>
        </>
        )
      }
    </Container>
  );
}

Loader.defaultProps = {
  isLoading: true,
  message: 'Loading...',
};

Loader.propTypes = {
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
