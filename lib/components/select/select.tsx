import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styles from '../input/input.module.scss';
import { Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Controller } from 'react-hook-form';
import Image from 'next/image';

interface SelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  control: any;
  name: string;
  label: string;
  isRequired?: boolean;
  helpIcon?: boolean;
  placeholder?: string;
  options: any;
  countrySelect?: boolean;
  defaultValue: any;
}

const FormSelect: React.FC<SelectProps> = ({
  control,
  name,
  isRequired,
  label,
  helpIcon,
  placeholder,
  options,
  countrySelect,
  defaultValue,
}) => {
  return (
    <section className={styles['custom-input-container']}>
      <div className={styles['custom-input-labels']}>
        <label className={styles['custom-input-label']}>
          {label} {isRequired && <span>*</span>}
        </label>
        <div className={styles['custom-input-right-label']}>
          {helpIcon && (
            <HelpOutlineIcon className={styles['custom-input-help-icon']} />
          )}
        </div>
      </div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{ required: isRequired && 'This field is required' }}
        render={({ field, fieldState }) => (
          <>
            {countrySelect ? (
              <Autocomplete
                defaultValue={defaultValue}
                className={styles['custom-input']}
                disablePortal
                options={options}
                autoHighlight
                onChange={(event, value) => field.onChange(value)}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}>
                    <Image
                      loading="lazy"
                      width={20}
                      height={20}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png, https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <>
                    {' '}
                    <TextField
                      {...field}
                      {...params}
                      placeholder={placeholder}
                    />
                    {fieldState.error && (
                      <p className={'error-message'}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            ) : (
              <Autocomplete
                className={styles['custom-input']}
                disablePortal
                defaultValue={defaultValue}
                options={options}
                autoHighlight
                onChange={(event, value) => field.onChange(value)}
                renderInput={(params) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {' '}
                    <TextField
                      {...field}
                      {...params}
                      placeholder={placeholder}
                    />
                    {fieldState.error && (
                      <p
                        style={{ marginBottom: '16px', position: 'relative' }}
                        className={'error-message'}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}
          </>
        )}
      />
      {/*THIS FOR MUI SELECT SPACE FIX*/}
      {<p style={{ color: 'transparent' }}>Error</p>}
    </section>
  );
};

export default FormSelect;
