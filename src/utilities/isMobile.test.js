import isMobile from './isMobile';

function setUserAgent(value) {
	window.navigator.userAgent = value;
}

describe('utilities/isMobile', () => {
	let old;

	beforeEach(() => {
		old = navigator.userAgent;

	});

	afterEach(() => {
		setUserAgent(old);
	});

	describe('detects Windows', () => {
		it('detects Windows NT, IE 9', () => {
			setUserAgent('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0; Touch; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; Tablet PC 2.0; MAARJS; WebView/1.0)');
			expect(isMobile.Windows()).toBe(true);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(true);
		});
		it('detects Windows Phone 8, IE 10', () => {
			setUserAgent('Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8X by HTC)');
			expect(isMobile.Windows()).toBe(true);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(true);
		});

		it('detects Mac', () => {
			setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Safari/605.1.15 (Airwatch Browser v7.7)');
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(false);
		});
	});

	describe('detects Android', () => {
		it('detects Android KitKat to Lollipop', () => {
			setUserAgent('Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36');
			expect(isMobile.Android()).toBe(true);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(true);
		});
		it('detects Android Lollipop and Above', () => {
			setUserAgent('Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36');
			expect(isMobile.Android()).toBe(true);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(true);
		});

		it('detects Mac', () => {
			setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Safari/605.1.15 (Airwatch Browser v7.7)');
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(false);
		});
	});

	describe('BlackBerry', () => {
		it('detects Blackberry', () => {
			setUserAgent('BlackBerry8520/5.0.0.681 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/600');
			expect(isMobile.BlackBerry()).toBe(true);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(true);
		});

		it('detects Mac', () => {
			setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Safari/605.1.15 (Airwatch Browser v7.7)');
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.any()).toBe(false);
		});
	});

	describe('iOS', () => {
		it('detects iOS', () => {
			setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
			expect(isMobile.iOS()).toBe(true);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.any()).toBe(true);
		});

		it('detects Mac', () => {
			setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Safari/605.1.15 (Airwatch Browser v7.7)');
			expect(isMobile.iOS()).toBe(false);
			expect(isMobile.Windows()).toBe(false);
			expect(isMobile.Android()).toBe(false);
			expect(isMobile.BlackBerry()).toBe(false);
			expect(isMobile.any()).toBe(false);
		});
	});
});
