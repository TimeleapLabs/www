export const formatDate = (date: Date): string =>
	date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

export const durationOf = (program: { duration: number }): string =>
	formatDate(new Date(Date.now() + program.duration * 1000));

export const yieldOf = (
	program: { rewards: bigint; duration: number },
	withNft: boolean
): string => {
	const multiplier = withNft ? 200000n : 100000n;
	const earned = (program.rewards * multiplier) / 1000000000000000000n;
	const earnedInDecimal = Number(earned) / 1000;
	const days = program.duration / 86400;
	const apr = (earnedInDecimal * (365 / days)).toFixed(1);
	return `${earnedInDecimal}% (~${apr}%/Y)`;
};
