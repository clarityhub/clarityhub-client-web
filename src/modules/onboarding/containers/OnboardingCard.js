import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { updateKey } from '../store/actions';
import OnboardingCard from '../components/OnboardingCard';

const OnboardingCardContainer = ({ children, id, updateKey, state }) => {
	const onDismiss = useCallback(() => {
		updateKey(id, 'dismissed');
	}, [id, updateKey]);

	if (state === 'dismissed') {
		return null;
	}

	return (
		<OnboardingCard onDismiss={onDismiss}>
			{children({ onDismiss })}
		</OnboardingCard>
	);
};

const mapStateToProps = (state, props) => {
	const id = props.id;
	const item = state.onboarding.items.find(item => item.id === id);
	return {
		state: item ? item.state : false,
	};
};

const mapDispatchToProps = {
	updateKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingCardContainer);
