const isMobile = {
	Windows: function Windows() {
		return /IEMobile/iu.test(navigator.userAgent) || (navigator.userAgent.includes('Windows') && navigator.userAgent.includes('Touch'));
	},
	Android: function Android() {
		return /Android/iu.test(navigator.userAgent);
	},
	BlackBerry: function BlackBerry() {
		return /BlackBerry/iu.test(navigator.userAgent);
	},
	iOS: function iOS() {
		return /iPhone|iPad|iPod/iu.test(navigator.userAgent);
	},
	any: function any() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
	},
};

export default isMobile;
