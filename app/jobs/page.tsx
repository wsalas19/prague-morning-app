import React, { useLayoutEffect } from "react";
import Image from "next/image";
import Topbar from "../../lib/components/toolBar/topbar";
import Dropdown from "@/lib/components/dropdown/dropdown";
import { SORTBY } from "@/lib/constant/constants";
import bg from "@/public/images/green-bg-search.svg";
import styles from "./jobsListPage.module.scss";
import JobItem from "../../lib/components/jobItem/jobItem";
import { JobData, optionItems } from "@/lib/types/componentTypes";
import { uniqueArray } from "@/lib/utils/uniqueArray/uniqueArray";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getData(params: any) {
	const res = await fetch(`https://prague-morning-backend.vercel.app/api/jobs?${params}`, {
		cache: "no-store",
	});
	if (!res) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

async function getOptions() {
	const res = await fetch(`https://prague-morning-backend.vercel.app/api/job-options`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

interface JobsPagePropsTypes {
	params?: { value: string | number };
	searchParams?: {
		location: string | undefined;
		jobTitle: string | undefined;
		workType: string | undefined;
		salary: string | undefined;
	};
}

const Jobs = async ({ searchParams }: JobsPagePropsTypes) => {
	const params = new URLSearchParams({
		location: searchParams?.location || "",
		jobTitle: searchParams?.jobTitle || "",
		workType: searchParams?.workType || "",
		salary: searchParams?.salary || "",
	});
	const jobs = await getData(params);
	const options = await getOptions();
	const locations = options.map(
		(item: JobData): optionItems => ({
			id: item._id!,
			label: item.location,
		}),
	);
	const specializations = options.map((item: JobData) => ({
		id: item._id,
		label: item.jobTitle,
	}));
	const workType = options.map((item: JobData) => ({
		id: item._id,
		label: item.workType,
	}));
	const salary = options
		.map((item: JobData) => {
			if (item.salary) {
				return {
					id: item._id,
					label: item.salary,
				};
			}
		})
		.filter((item: any) => item !== undefined);
	const defaultLocation = uniqueArray(locations)?.find(
		(item) => item.label == searchParams?.location,
	);
	const defaultJobTitle = uniqueArray(specializations)?.find(
		(item) => item.label == searchParams?.jobTitle,
	);
	const defaultWorkType = uniqueArray(workType)?.find(
		(item) => item.label == searchParams?.workType,
	);
	const defaultSalary = uniqueArray(salary)?.find((item) => item.label == searchParams?.salary);

	return (
		<section className={styles["page-jobs"]}>
			<div className={`container ${styles["page-container"]}`}>
				<Topbar
					defaultJobSearchValue={searchParams?.jobTitle}
					defaultLocation={defaultLocation?.id}
					defaultJobTitle={defaultJobTitle?.id}
					defaultWorkType={defaultWorkType?.id}
					defaultSalary={defaultSalary?.id}
					specializations={uniqueArray(specializations)}
					locations={uniqueArray(locations)}
					workType={uniqueArray(workType)}
					salary={uniqueArray(salary)}
				/>
				<div className={styles["content"]}>
					<div className={styles["results"]}>
						<p className={styles["results-count"]}>
							{jobs?.length || "No"} {jobs?.length > 1 ? "jobs" : "job"} found
						</p>
						<div className={styles["results-sort"]}>
							<p className='font-sans'>Sort by:</p>
							<Dropdown
								items={SORTBY}
								headerTitle='Newest'
								className='dropdown-sort'
								defaultSelected={0}
							/>
						</div>
					</div>

					<div className={styles["results-data"]}>
						{jobs &&
							Array.isArray(jobs) &&
							jobs?.length > 0 &&
							jobs?.map((result: any) => <JobItem data={result} key={result._id} />)}
					</div>

					<div className={styles["join-us"]}>
						<h5>Join our Job group on Facebook</h5>
						<a
							href='https://www.facebook.com/groups/jobsinpragueforeigners---'
							target={"_blank"}
							className={styles["join-link"]}
						>
							Join Here
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Jobs;
