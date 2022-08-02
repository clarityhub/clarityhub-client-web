
export default function download(url, filename) {
	const a = document.createElement('a');
	document.body.appendChild(a);
	a.style = 'display: none';

	a.href = url;
	a.target = '_blank';
	a.setAttribute('download', filename);
	a.click();
	window.URL.revokeObjectURL(url);
	document.body.removeChild(a);
}
