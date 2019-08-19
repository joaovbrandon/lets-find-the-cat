import styled from 'styled-components';
import originalReactSelect from 'react-select';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1 0;
  margin: 5px;

  .select {
    &-container {
      width: 100%;
    }

    &__{
      &control {
        border-radius: 8px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
        font-size: ${fontSizes.small};
        outline: none;
        min-height: 46px;

        &--is-focused,
        &--menu-is-open,
        &:hover,
        &:focus,
        &:active {
          border: 2px solid ${colors.primary};
          box-shadow: 0 0 0 1px ${colors.inputShadow};
        }
      }

      &placeholder,
      &input,
      &single-value {
        color: ${colors.primary};
        font-size: ${fontSizes.small};
      }

      &indicator-separator {
        background: ${colors.secondary};
      }

      &indicator {
        color: ${colors.primary};
        cursor: pointer;
      }

      &multi-value__{
        &remove {
          cursor: pointer;
          color: ${colors.primary};
          transition: .2s all;

          &:hover {
            color: ${colors.white};
            background: ${colors.backgroundOpacity};
          }
        }

        &label {
          color: ${colors.primary};
          font-size: ${fontSizes.small};
        }
      }

      &menu {
        &-list {
        }
      }

      &option {
        color: ${colors.primary};
        font-size: ${fontSizes.small};

        &--is-selected {
          background: transparent;
        }

        &--is-focused,
        &:hover,
        &:active {
          background: ${colors.selectHover};
          cursor: pointer;
        }
      }
    }
  }
`;

export const ReactSelect = styled(originalReactSelect)`
  flex: 1;
  z-index: auto;
`;

export const Label = styled.div`
  font-size: ${fontSizes.small};
  font-weight: bold;
  margin-left: 12px;
`;
