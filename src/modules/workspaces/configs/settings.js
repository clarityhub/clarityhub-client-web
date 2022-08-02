import {
	mdiAccountCircleOutline,
	mdiCog as mdiSettings,
	mdiDomain,
	mdiAccountMultiplePlusOutline,
	mdiRocket,
	mdiCreditCardOutline,
	mdiAppsBox,
} from '@mdi/js';

export default [
	{
		title: 'Your Account',
		items: [
			{
				icon: mdiAccountCircleOutline,
				to: '/settings/me',
				title: 'Profile',
			},
			{
				icon: mdiDomain,
				to: '/settings/my-workspaces',
				title: 'Your Workspaces',
			},
		],
	},
	{
		title: 'Workspace',
		items: [
			{
				role: ['member', 'updateAny'],
				icon: mdiSettings,
				title: 'Settings',
				to: '/settings/workspace',
			},
			{
				role: ['integrations', 'updateAny'],
				icon: mdiAppsBox,
				flag: ['features', 'integrations'],
				title: 'Integrations',
				to: '/settings/integrations',
			},
			{
				icon: mdiAccountMultiplePlusOutline,
				title: 'Members',
				to: '/settings/members',
			},
			{
				role: ['billing', 'updateAny'],
				icon: mdiRocket,
				title: 'Plans',
				to: '/settings/plans',
			},
			{
				role: ['billing', 'updateAny'],
				icon: mdiCreditCardOutline,
				title: 'Payment',
				to: '/settings/payment',
			},
		],
	},

];
