import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import BusinessCard from './BusinessCard';

const Profile = ({ user, onUpdate, editable }) => {
	const handleUpdate = (data) => {
		return onUpdate({
			metadata: {
				...user.metadata,
				...data,
			},
		});
	};

	const metadata = user.metadata || {
		avatars: {
			default: null,
		},
		email: '',
		name: '',
		bio: '',
	};

	return (
		<Box style={{ position: 'relative' }}>
			<BusinessCard
				avatarUrl={metadata.avatars.default}
				email={metadata.email}
				name={metadata.name}
				bio={metadata.bio}
				editable={editable}
				onUpdate={handleUpdate}
			/>
		</Box>
	);
};

export default Profile;
