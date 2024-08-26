export const throttle = (func: (...args: any[]) => void, delay: number) => {
	let lastCall = 0;
	return (...args: any[]) => {
		const now = new Date().getTime();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return func(...args);
	};
};
