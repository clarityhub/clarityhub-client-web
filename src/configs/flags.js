import isMobile from '../utilities/isMobile';

export default {
	platform: {
		mobile: () => isMobile.any(),
	},
	features: {
		inprogress: process.env.NODE_ENV === 'development',
		surveys: process.env.NODE_ENV === 'development',
		integrations: true,
		tagManagement: true,
		billing: true,
		editorTags: true,
		drift: true,
		globalSearch: process.env.REACT_APP_ENABLE_GLOBAL_SEARCH === 'true',
		highlights: process.env.REACT_APP_ENABLE_HIGHLIGHTS === 'true',
	},
};
