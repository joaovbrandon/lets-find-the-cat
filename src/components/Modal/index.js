import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HelperService } from '../../services';
import {
  Container, Opacity, Content, Close,
} from './styles';

function Modal({
  opened, setOpened, title, description, maxWidth, children, isLoading,
}) {
  useEffect(() => {
    const closeModalListener = (event) => {
      if (isLoading) return;

      if (event.type === 'resize') {
        setOpened(false);
        return;
      }

      if (event.type === 'keyup') {
        const key = event.key || event.keyCode;
        if (key === 'Escape' || key === 'Esc' || key === 27) setOpened(false);
      }
    };

    if (opened) {
      HelperService.lockScroll();
      window.addEventListener('keyup', closeModalListener);
      window.addEventListener('resize', closeModalListener);
    }

    return () => {
      HelperService.lockScroll(false);
      window.removeEventListener('keyup', closeModalListener);
      window.removeEventListener('resize', closeModalListener);
    };
  }, [opened, setOpened, isLoading]);

  return (
    <Container opened={opened}>
      <Opacity onClick={() => setOpened(false)} />
      <Content maxWidth={maxWidth}>
        <Close onClick={() => setOpened(false)}>&times;</Close>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {children}
      </Content>
    </Container>
  );
}

Modal.defaultProps = {
  title: null,
  description: null,
  maxWidth: '90%',
};

Modal.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  maxWidth: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
});

export default connect(
  mapStateToProps,
)(Modal);
