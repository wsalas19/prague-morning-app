import {Modal} from "@mui/material";
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./uploadModal.module.scss"
import Dropzone from "@/lib/components/dropzone/dropzone";
import Input from "@/lib/components/input/input";
import {emailValidationRegexp} from "@/lib/constant/constants";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Image from "next/image";
import locationIcon from "@/public/images/icons/location-grey.svg";
import {Button} from "@mui/base";

interface Inputs {
  email: string,
  title: string,
  location:string
}
interface UploadModalPropsTypes{
  open:boolean,
  setOpen:(value:boolean)=>void
}
const UploadModal = ({open,setOpen}:UploadModalPropsTypes) => {

  const handleClose = () => setOpen(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<Inputs>()


  const onSubmit=(values:Inputs)=>{
    setOpen(false)
    reset()
  }

  return (
    <Modal open={open}
           onClose={handleClose}>

      <div className={styles["upload-modal"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <IconButton
          style={{position: "absolute", top: "4px", right: "8px"}}
          onClick={() => setOpen(false)}
        >
          <CloseIcon/>
        </IconButton>
        <h1 className={styles["upload-modal__title"]}>
          Upload your resume
        </h1>
        <p className={styles["upload-modal__subtitle"]}>
          Add your resume and get easier noticed by
          local recruiters!
        </p>
          <div className={styles["upload-modal__form"]}>
            <Dropzone/>
            <Input control={control} pattern={{
              value: emailValidationRegexp,
              message: "Invalid email address"
            }} startIcon={<MailOutlineIcon className={styles["login-modal-form-icon"]}/>} authInput
                   errors={errors} name={"email"} label="Email address"
                   placeholder="Enter email"/>
            <Input control={control} authInput isRequired
                   errors={errors} name={"title"} label="Your job title or qualification"
                   placeholder="Text..."/>
            <Input control={control} authInput isRequired
                   errors={errors} name={"location"} label="Your location"
                   placeholder="City, state or country" endIcon={<Image src={locationIcon} alt='location'/>}/>
            <div className={styles["upload-modal__form__buttons"]}>
              <Button onClick={() => setOpen(false)} style={{maxWidth: "164px", height: "46px"}} className={`btn-green-outlined`}>
                Cancel
              </Button>
              <Button style={{background:"#E6E6E6"}} type="submit" className='btn-main-grey'>Upload</Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UploadModal;