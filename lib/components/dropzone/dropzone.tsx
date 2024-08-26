import React from 'react';
import {useDropzone} from 'react-dropzone'
import styles from "./dropzone.module.scss"
import Image from "next/image";
import file from "@/public/images/icons/file.svg"
const Dropzone = () => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map((file:any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className={styles["dropzone-container"]}>
      <p className={styles["dropzone-container__label"]}>CV/Resume</p>
      <div {...getRootProps({className:styles["dropzone"]})}>
        <input {...getInputProps()} />
        <Image src={file} width={32} height={32} alt=""/>
        <h1>Drop file here</h1>
        <p>(doe, .docx, part, txt. Max size 2MB)</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Dropzone;