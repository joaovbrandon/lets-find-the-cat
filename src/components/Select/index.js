import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { Container, Label, ReactSelect } from './styles';

function Select({
  className,
  classNamePrefix,
  label,
  name,
  options,
  multiple,
  disabled,
  loading,
  clearable,
  searchable,
  rtl,
  ...props
}) {
  const ref = useRef(null);

  const {
    fieldName, registerField, error,
  } = useField(name);

  useEffect(() => {
    const parseSelectValue = (selectValue) => {
      if (!multiple) return selectValue ? selectValue.value : '';
      return selectValue ? selectValue.map(option => option.value) : [];
    };

    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: (selectRef) => {
        selectRef.select.clearValue();
      },
    });
  }, [multiple, ref, fieldName, registerField]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <ReactSelect
        className={className}
        classNamePrefix={classNamePrefix}
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        isDisabled={disabled}
        isLoading={loading}
        isClearable={clearable}
        isSearchable={searchable}
        isRtl={rtl}
        ref={ref}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        {...props}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

Select.defaultProps = {
  className: 'select-container',
  classNamePrefix: 'select',
  label: null,
  multiple: false,
  disabled: false,
  loading: false,
  clearable: true,
  searchable: true,
  rtl: false,
};

Select.propTypes = {
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType(
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
      ),
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  rtl: PropTypes.bool,
};

export default Select;
