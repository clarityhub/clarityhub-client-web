import { combineReducers } from 'redux';

import appReducer from './modules/app/store/reducer';
import authReducer from './modules/auth/store/reducer';
import activitiesReducer from './modules/dashboards/store/reducer';
import chatbotReducer from './modules/chatbot/store/reducer';
import integrationsReducer from './modules/integrations/store/reducer';
import notebooksReducer from './modules/notebooks/store/reducer';
import interviewsReducer from './modules/interviews/store/reducer';
import editorReducer from './modules/editor/store/reducer';
import mediasReducer from './modules/medias/store/reducer';
import membersReducer from './modules/members/store/reducer';
import onboardingReducer from './modules/onboarding/store/reducer';
import plansReducer from './modules/plans/store/reducer';
import tagsReducer from './modules/tags/store/reducer';
import recordingsReducer from './modules/recordings/store/reducer';
import socketsReducer from './modules/sockets/store/reducer';
import workspacesReducer from './modules/workspaces/store/reducer';
import billingReducer from './modules/billing/store/reducer';
import videoCallsReducer from './modules/videoCalls/store/reducer';

import { LOGIN_LOADING, LOGOUT } from './modules/auth/store/constants';

const allReducers = combineReducers({
	app: appReducer,
	session: authReducer,
	activities: activitiesReducer,
	chatbot: chatbotReducer,
	editor: editorReducer,
	notebooks: notebooksReducer,
	interviews: interviewsReducer,
	integrations: integrationsReducer,
	medias: mediasReducer,
	members: membersReducer,
	onboarding: onboardingReducer,
	plans: plansReducer,
	billing: billingReducer,
	recordings: recordingsReducer,
	sockets: socketsReducer,
	tags: tagsReducer,
	workspaces: workspacesReducer,
	videoCalls: videoCallsReducer,
});

export default (state, action = {}) => {
	let prevState = state;
	if (action.type === LOGOUT) {
		prevState = undefined;
	}

	if (action.type === LOGIN_LOADING) {
		prevState = {
			session: state.session,
			// Clear out the rest of the store
		};
	}

	return allReducers(prevState, action);
};
