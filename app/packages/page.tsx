'use client';
import React, { useState } from 'react';
import styles from './packagesPage.module.scss';
import packagesBg from '../../public/images/packageBg.svg';
import Image from 'next/image';
import PostJobActions from '@/lib/components/postJobActions/postJobActions';
import { POST_PACKAGES_ACTIONS } from '@/lib/constant/constants';
import checkMark from '@/public/images/icons/checkmark.svg';
import PackagesCheckbox from '@/lib/components/packages/packagesCheckbox';

const PackagesPage = () => {
  const PACKAGES = [
    {
      title: '5 Job Postings',
      percent: '30% Rebate',
      value: '$275.00',
      active: true,
    },
    {
      title: '10 Job Postings',
      percent: '40% Rebate',
      value: '$390.00',
      active: false,
    },
    {
      title: '15 Job Postings',
      percent: '50% Rebate',
      value: '$650.00',
      active: false,
    },
  ];

  const [packages, setPackages] = useState(PACKAGES);

  const changePackage = (title: any, checked: any) => {
    console.log(title);
    console.log(checked);
    const selectedPackages = PACKAGES.map((item) => ({
      ...item,
      active: item.title === title && checked ? true : false,
    }));
    setPackages(selectedPackages);
  };

  return (
    <section className={styles['packages_page']}>
      <div className={styles['about_contex']}>
        <div className={styles['about_contex__image']}>
          <Image src={packagesBg} alt="Package's Background" />
        </div>
        <div className={styles['about_contex__list']}>
          <h1>Advantages</h1>
          <PostJobActions
            data={POST_PACKAGES_ACTIONS}
            image={checkMark}
            color="black"
          />
        </div>
      </div>
      <div className={styles['packages-page__wrapper']}>
        <label className={styles['components_head']}>Select your package</label>

        {packages.map((item, index) => (
          <PackagesCheckbox
            key={index}
            title={item.title}
            percent={item.percent}
            value={item.value}
            checked={item.active}
            onChange={changePackage}
          />
        ))}
      </div>
      <label className={styles['ending_text_head']}> Want to post more?</label>
      <p className={styles['ending_text']}>
        Please contact us and we will find a personalized solution for you.
      </p>
    </section>
  );
};

export default PackagesPage;
