"use client";
import React from "react";
import Button from "../button/button";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const LoginBtn = () => {
	const { push } = useRouter();
	const user = useAppSelector((state) => state.user.user);
	return (
		<>
			{user ? (
				<Button
					style={{ maxWidth: "227px", height: "62px", borderRadius: "18px", gap: "10px" }}
					onClick={() => {
						localStorage.removeItem("token");
						window.location.reload();
					}}
					className='btn btn-green-outlined'
				>
					Log Out
				</Button>
			) : (
				<Button
					style={{ maxWidth: "227px", height: "62px", borderRadius: "18px", gap: "10px" }}
					onClick={() => push("/login")}
					className='btn btn-green-outlined'
				>
					Log in
				</Button>
			)}
		</>
	);
};

export default LoginBtn;
