import axios from 'axios';
import { getStore } from 'store.js';

export default function getBaseApi(BaseApi) {
	return {
		auth: {
			login({ token }) {
				return BaseApi.post('/auth/login', null, { token });
			},
			loginWorkspace(workspaceId, { token }) {
				return BaseApi.post('/auth/login/workspace', { workspaceId }, { token });
			},
			refresh() {
				const token = getStore().getState().session.refreshToken;
				return BaseApi.post('/auth/refresh', null, { token, noRetry: true });
			},

			updateMetadata(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put('/auth/me/metadata', payload, { token });
			},
		},

		plans: {
			getUsage() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/plans/usage', { token });
			},
		},

		activities: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/activities', { token });
			},
		},

		integrations: {
			info() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/integrations/info', { token });
			},
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/integrations/', { token });
			},
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/integrations/${id}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/integrations', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/integrations/${id}`, payload, { token });
			},
			test(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/integrations/${id}/actions/test`, payload, { token });
			},
			delete(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/integrations/${id}`, { token });
			},
		},

		notebooks: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/interviews/', { token });
			},
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/interviews/${id}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/interviews', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/interviews/${id}`, payload, { token });
			},
			delete(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/interviews/${id}`, { token });
			},
		},

		interviews: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/v2/interviews/', { token });
			},
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/v2/interviews/${id}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/v2/interviews', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/v2/interviews/${id}`, payload, { token });
			},
			delete(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/v2/interviews/${id}`, { token });
			},
		},

		medias: {
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/medias/${id}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/medias', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/medias/${id}`, payload, { token });
			},
			getUploadUrl(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/medias/${id}/actions/upload`, {}, { token });
			},
			complete(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/medias/${id}/actions/complete`, {}, { token });
			},

			upload(urlData, blob, fileName, contentType, { onProgress }) {
				const fileObject = new File([blob], fileName, {
					type: contentType,
				});

				const formData = new FormData();

				Object.keys(urlData.fields).forEach(key => {
					formData.append(key, urlData.fields[key]);
				});
				formData.append('Content-Type', contentType);
				formData.append('file', fileObject);

				return axios.post(urlData.url, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					onUploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

						onProgress(percentCompleted);
					},
				});
			},
		},
		members: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/members/', { token });
			},
			getMe() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/members/me', { token });
			},
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/members/${id}`, { token });
			},
			invite(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/members', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/members/${id}`, payload, { token });
			},
			resendInvite(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/members/${id}/actions/resend-invite`, {}, { token });
			},
			kick(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/members/${id}`, { token });
			},
			leave() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete('/members/me', { token });
			},
		},

		onboarding: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/onboarding/', { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/onboarding/${id}`, payload, { token });
			},
		},

		tags: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/tags', { token });
			},
			get(tagPath) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/tags/${tagPath}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/tags', payload, { token });
			},
			update(tagPath, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/tags/${tagPath}`, payload, { token });
			},
			delete(tagPath) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/tags/${tagPath}`, { token });
			},
		},

		tagItems: {
			getAllByTagPath(tagPath) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/tags/${tagPath}/items`, { token });
			},
			getTagItemsStatistics() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/tags/items/stats', { token });
			},
			getAllForItem(type, itemId) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/tags/items/${type}/${itemId}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/tags/items', payload, { token });
			},
			delete(itemTagPath) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/tags/items/${itemTagPath}`, { token });
			},
		},

		workspaces: {
			getAll({ token }) {
				return BaseApi.get('/workspaces', { token });
			},
			getAllAuthed() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/workspaces-auth', { token });
			},
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/workspaces/${id}`, { token });
			},
			create(payload, { token }) {
				return BaseApi.post('/workspaces', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/workspaces/${id}`, payload, { token });
			},
			delete(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/workspaces/${id}`, { token });
			},
		},

		billing: {
			getAll() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/billing', { token });
			},
			getInvoices() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get('/billing/invoices', { token });
			},
			updateInfo(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put('/billing/info', payload, { token });
			},
			updateSub(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/billing/subscription', payload, { token });
			},
			cancelSub() {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete('/billing/subscription', { token });
			},
		},

		videoCalls: {
			get(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.get(`/videoCalls/${id}`, { token });
			},
			create(payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post('/videoCalls', payload, { token });
			},
			update(id, payload) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.put(`/videoCalls/${id}`, payload, { token });
			},
			delete(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.delete(`/videoCalls/${id}`, { token });
			},
			start(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/videoCalls/${id}/actions/start`, {}, { token });
			},
			join(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/videoCalls/${id}/actions/join`, {}, { token });
			},
			end(id) {
				const token = getStore().getState().session.accessToken;
				return BaseApi.post(`/videoCalls/${id}/actions/end`, {}, { token });
			},
		}
	};
}
