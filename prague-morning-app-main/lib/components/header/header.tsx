import React from 'react';
import './header.scss';

;
import Button from '../button/button';
import Link from "next/link";
import {useRouter} from "next/navigation";

const TopHeader = () => {
  const {push} = useRouter()
  return (
    <div className='header'>
      <div className="header-top container">
        <div className="search-post-group">
          <div className='search-group'>
            {/*<Image src={searchIcon} alt="search" className='search-icon' />*/}
            {/*<input type="text" className='header-search' placeholder='Company, Job Title...' />*/}
          </div>
          <Link href="/" className='header-post-home'>Home</Link>
          <Link href="/jobs" className='header-post-find'>Find a job</Link>
          <Link href="/post-job-info" className='header-post-post'>Post a job</Link>
        </div>
        <div className="post-btn-group">
          <Button onClick={()=>push("/contact")} icon={"images/icons/contact.svg"}
                  style={{maxWidth: "227px", height: "62px", borderRadius: "18px", gap: "10px"}}
                  className={`btn-green-outlined`}>
            Contact us
          </Button>
          <Button icon={"images/icons/add.svg"} style={{maxWidth: "185px", gap: "10px"}}
                  onClick={() => push("/post-resume")} className='btn header-post-resume'> Post your resume</Button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
