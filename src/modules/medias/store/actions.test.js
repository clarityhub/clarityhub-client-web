import * as actions from './actions';

const RESPONSE = Symbol();
const CREATE_RESPONSE = { id: Symbol() };
const MEDIA_UPLOAD_RESPONSE = {
	presignedUrl: 'url',
	filename: 'name',
	fileType: 'type',
};
const ERROR = Symbol();

const ID = '1';
const CREATE_PAYLOAD = Symbol();
const DISPATCH = () => { };
const GET_STATE = () => {
	return {};
};
const SERVICES = {
	api: {
		medias: {
			get() {
				return Promise.resolve(RESPONSE);
			},
			getAll() {
				return Promise.resolve(RESPONSE);
			},
			getAllAuthed() {
				return Promise.resolve(RESPONSE);
			},
			create() {
				return Promise.resolve(CREATE_RESPONSE);
			},
			update() {
				return Promise.resolve(CREATE_RESPONSE);
			},
			delete() {
				return Promise.resolve(CREATE_RESPONSE);
			},
			getUploadUrl() {
				return Promise.resolve(MEDIA_UPLOAD_RESPONSE);
			},
			upload() {
				return Promise.resolve(CREATE_RESPONSE);
			},
			complete() {
				return Promise.resolve(CREATE_RESPONSE);
			},
		},
	},
};

describe('media actions', () => {
	describe('get media', () => {
		it('returns a promise', () => {
			const resp = actions.getMedia(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getMedia(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: RESPONSE,
				}));
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					medias: {
						get() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getMedia(ID)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});

	describe('create media', () => {
		it('returns a promise', () => {
			const resp = actions.createMedia(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.createMedia(CREATE_PAYLOAD)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: CREATE_RESPONSE,
				}));
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					medias: {
						create() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.createMedia(CREATE_PAYLOAD)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});

	describe('update media', () => {
		it('returns a promise', () => {
			const resp = actions.updateMedia(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.updateMedia(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: CREATE_RESPONSE,
				}));
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					medias: {
						update() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.updateMedia(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});

	describe('media modifiers', () => {
		it('returns a promise', () => {
			const resp = actions.sendMedia(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});


		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.sendMedia(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// 3 times since finalizing, then uploading, then success is called
				expect(dispatch).toHaveBeenCalledTimes(3);

				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					mediaId: ID,
					progress: 0,
				}));
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					medias: {
						upload() {
							return Promise.reject(ERROR);
						},
						getUploadUrl() {
							return Promise.resolve(MEDIA_UPLOAD_RESPONSE);
						},
					},
				},
			};

			const resp = actions.sendMedia(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(3);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});
});
