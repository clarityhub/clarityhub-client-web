import { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';

import { getAll } from '../store/actions';
import { useAuth0 } from '../../../services/Auth0';

const LoadWorkspaces = ({
	error,
	isReady,
	workspaces,
	getAll,
	children,
	hasLoadedAll,
}) => {
	const { getIdToken } = useAuth0();
	const [tokenError, setTokenError] = useState(false);

	const callApi = useCallback(async () => {
		try {
			const token = await getIdToken();

			getAll({ token });
		} catch (e) {
			setTokenError(e);
		}

	}, [getAll, getIdToken]);

	useEffect(() => {
		if (!hasLoadedAll) {
			callApi();
		}
	}, [callApi, hasLoadedAll]);

	return children({
		error: error || tokenError,
		isReady,
		workspaces,
	});
};

const mapStateToProps = (state) => {
	return {
		workspaces: state.workspaces.items,
		error: state.workspaces.error,
		isReady: state.workspaces.hasLoadedAll,
		hasLoadedAll: state.workspaces.hasLoadedAll,
	};
};

const mapDispatchToProps = {
	getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadWorkspaces);
