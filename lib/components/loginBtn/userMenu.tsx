import React, { useEffect, useRef, useState } from "react";
import { UserMenuProps } from "@/lib/types/componentTypes";

function UserMenu({ items, user }: UserMenuProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const handleOptionClick = (item: any) => {
		if (item.label === "Log Out") {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			window.location.reload();
		} else {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div className='relative inline-block' ref={menuRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='h-full border-primary border-2 rounded-2xl px-6 py-4 text-black flex items-center gap-3 hover:border-baseBlack50 '
			>
				<svg className='aspect-square h-7' viewBox='0 0 20 20' fill='#009c77'>
					<path d='M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z'></path>
				</svg>
				<span className='text-black font-bold'>{user?.email}</span>
			</button>
			{isOpen && (
				<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
					<ul className='py-1'>
						{items.map((item, index) => (
							<li key={index}>
								<a
									href={item.path}
									className={`block px-4 py-2 text-sm ${
										item.label === "Log Out" ? "text-required" : "text-gray-700"
									}  hover:bg-gray-100`}
									onClick={() => handleOptionClick(item)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default UserMenu;
