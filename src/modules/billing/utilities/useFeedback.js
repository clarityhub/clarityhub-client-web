import React, { useCallback, useRef, useLayoutEffect } from 'react';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Dismissable from '@clarityhub/unity-web/lib/interactions/Dismissable';

const MountedNotification = ({ content }) => {
	const notificationRef = useRef();

	useLayoutEffect(() => {
		if (notificationRef && notificationRef.current) {
			notificationRef.current.scrollIntoView({
				block: 'center',
			});
		}
	});

	return (
		<Dismissable>
			{({ Dismiss }) => (
				<Notification type={content.type} variant="thin">
					<Dismiss />
					<div ref={notificationRef}>
						{content.text}
					</div>
				</Notification>
			)}
		</Dismissable>
	);
};

/**
 * Common helper hook for rendering card update feedback
 *
 * Usage:
 *
 * ```
 * const MyComponent = () => {
 *     const renderFeedback = useFeedback(status, error);
 * 	   return renderFeedback();
 * }
 * ```
 *
 * @param {*} status
 * @param {*} error
 */
const useFeedback = (status, error) => {
	const renderFeedback = useCallback(() => {
		let content = {
			type: '',
			text: '',
		};

		switch (status) {
		case 'success': {
			content.type = 'success';
			content.type = 'Your card information has been updated';
			break;
		}
		case 'failed': {
			content.type = 'danger';
			content.type = 'We were not able to update your card at this time';
			break;
		}
		default: {
			if (!error) {
				return null;
			}
		}
		}

		if (error) {
			content.type = 'danger';
			content.text = error.message || error;
		}

		return (
			<MountedNotification content={content} />
		);
	}, [error, status]);


	return renderFeedback;
};

export default useFeedback;
