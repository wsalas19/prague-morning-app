import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styles from "./input.module.scss"
import {TextField} from "@mui/material";
import { Controller} from 'react-hook-form';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: string;
  label: string;
  isRequired?: boolean;
  helpIcon?: boolean;
  placeholder?: string | undefined;
  endIcon?: JSX.Element;
  type?: string;
  startIcon?: JSX.Element;
  authInput?: boolean;
  pattern?: any;
  minLength?: any;
  inputProps?: any;
  control?: any,
  errors?: any,
  className?:string | undefined
}

const Input: React.FC<InputProps> = ({
                                       name,
                                       isRequired,
                                       label,
                                       helpIcon,
                                       placeholder,
                                       endIcon,
                                       type,
                                       startIcon,
                                       authInput = false,
                                       pattern = {},
                                       minLength = {},
                                       inputProps = {},
                                       control,
                                       errors,
                                       className
                                     }) => {

  return (
    <section className={styles["custom-input-container"]}>
      <div className={styles["custom-input-labels"]}>
        <label className={styles["custom-input-label"]}>{label} {isRequired && <span>*</span>}</label>
        <div className={styles["custom-input-right-label"]}>
          {helpIcon && <HelpOutlineIcon className={styles["custom-input-help-icon"]}/>}
        </div>
      </div>

      <Controller
        control={control}
        name={name}
        rules={{required: isRequired,minLength,pattern}}
        render={({field}) => (
          <TextField
            inputProps={inputProps}
            InputProps={{
              endAdornment: (
                endIcon ? endIcon : <></>
              ),
              startAdornment: (
                startIcon ? startIcon : <></>
              )
            }}
            className={authInput ? styles["custom-input-auth"] : `${styles["custom-input"]} ${className ? styles[className] :""}`}
            placeholder={placeholder}
            {...field}
            type={type || "text"}
          />
        )}
      />

      {errors[name] &&
        <p className={"error-message"}>{errors[name].message ? errors[name].message : "This field is required"}</p>}
    </section>
  );
};

export default Input;
