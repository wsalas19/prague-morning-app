"use client";
import React from "react";
import jobSeekers from "@/public/images/job-seekers.svg";
import jobPosters from "@/public/images/job-posters.svg";
import styles from "./homePage.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/lib/components/button/button";
import Footer from "@/app/footer";
import TopHeader from "@/lib/components/header/header";

const Home = () => {
	const { push } = useRouter();
	return (
		<section className={styles["page-main"]}>
			<TopHeader />
			<div className={styles["sections"]}>
				<div className={styles["offers"]}>
					<div className={styles["section-content"]}>
						<p className={styles["top-title"]}>FOR JOB SEEKERS</p>
						<p className={styles["main-title"]}>Get work and get paid the in Czech Republic</p>
						<p className={styles["desc"]}>
							Find steady work, near you. Any industry. Any experience level. Easy.
						</p>
						<Button
							style={{ minHeight: "64px" }}
							onClick={() => push("/jobs")}
							className={`${styles["btn"]} ${styles["btn-main-purple"]}`}
						>
							Get a job now
						</Button>
						<div className={styles["listings__posting-image"]}>
							<Image
								src={jobSeekers}
								fill
								alt='person'
								className={styles["posting-image"]}
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					</div>
				</div>
				<div className={styles["listings"]}>
					<div className={styles["section-content"]}>
						<p className={styles["top-title"]}>FOR COMPANIES</p>
						<p className={styles["main-title"]}>Hire reliable and trusted workers now</p>
						<p className={styles["desc"]}>
							Drive candidates to your career site and convert them into applicants.
						</p>
						<Button
							style={{ minHeight: "64px" }}
							onClick={() => push("/post-job-info")}
							className={`${styles["btn"]} ${styles["btn-main-primary"]}`}
						>
							Post Your Job
						</Button>
						<div className={styles["listings__posting-image"]}>
							<Image
								src={jobPosters}
								fill
								alt='person'
								className={styles["posting-image"]}
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
};

export default Home;
