export const ogImage = (text: string, fontSize: number = 28) => {
	const uriEncodedText = encodeURIComponent(text);
	const uri = `https://timeleap.swiss/og.png?text=${uriEncodedText}&fontSize=${fontSize}`;
	return uri;
};
