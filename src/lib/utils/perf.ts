// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, delay: number) => {
	let timer: NodeJS.Timeout;
	return function (...args: unknown[]) {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
};
