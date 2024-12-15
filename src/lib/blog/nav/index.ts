import { entries } from './entries';
export { fullNav } from './entries';

type Maybe<T> = T | undefined;
type NavEntry = { href: string; title: string };
type Nav = { prev: Maybe<NavEntry>; next: Maybe<NavEntry> };

export const getNavForPage = (href: string): Nav => {
	const index = entries.findIndex((entry) => entry.href === href);
	const prev = entries[index - 1];
	const next = entries[index + 1];
	return { prev, next };
};
