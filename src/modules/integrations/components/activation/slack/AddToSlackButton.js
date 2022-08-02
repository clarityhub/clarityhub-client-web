import React from 'react';

const AddToSlackButton = ({ redirectUrl, state, disabled }) => {
	const scopes = 'channels:join,chat:write,files:write,links:write,chat:write.public';
	let href = `https://slack.com/oauth/v2/authorize?scope=${scopes}&client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}`;

	if (redirectUrl) {
		href += `&redirect_uri=${encodeURIComponent(redirectUrl)}`;
	}

	if (state) {
		href += `&state=${JSON.stringify(state)}`;
	}

	href = disabled ? '#' : href;

	return (
		<a href={href} disabled={disabled} style={{ opacity: disabled ? 0.6 : 1.0 }}>
			<img
				alt="Add to Slack"
				height="40"
				width="139"
				src="https://platform.slack-edge.com/img/add_to_slack.png"
				srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
			/>
		</a>
	);
};

export default AddToSlackButton;
