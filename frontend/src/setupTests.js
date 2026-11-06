import '@testing-library/jest-dom';

if (!window.matchMedia) {
	window.matchMedia = (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false
	});
}

if (HTMLCanvasElement.prototype.getContext) {
	HTMLCanvasElement.prototype.getContext = () => null;
}
