import React, { useCallback, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { mdiTable, mdiChartDonut } from '@mdi/js';
import Icon from '@mdi/react';
import Page from 'modules/app/layouts/Page';
import Tabs from '@clarityhub/unity-web/lib/components/Tabs';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import {
	getAll as getTags,
	create as createTag,
	update as updateTag,
	del as deleteTag,
} from '../store/actions';

const TagsTable = React.lazy(() => import('../components/TagsTable'));
const TagsCharts = React.lazy(() => import('../containers/TagsCharts'));

const Tags = ({ tags, error, hasLoadedAll, getTags, createTag, updateTag, deleteTag }) => {
	const doSideEffects = useCallback(() => {
		if (!hasLoadedAll) {
			getTags();
		}
	}, [getTags, hasLoadedAll]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	return (
		<Page
			title="Tags"
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Tags',
				},
			]}
		>
			<Tabs.Container
				onChange={(selected) => {
					window.location.hash = selected;
				}}
				defaultTab={window.location.hash.replace('#', '')}>
				<Tabs.Tabs style={{ textAlign: 'right' }}>
					<Tabs.Tab tab="table" title="Switch to Table View">
						<Icon
							path={mdiTable}
							title="Find"
							color="currentColor"
							size={0.8}
							style={{ verticalAlign: 'middle' }}
						/>
						<span style={{ verticalAlign: 'middle' }}>
							{' '}
							Table
						</span>
					</Tabs.Tab>
					<Tabs.Tab tab="chart" title="Switch to Chart View">
						<Icon
							path={mdiChartDonut}
							title="Find"
							color="currentColor"
							size={0.8}
							style={{ verticalAlign: 'middle' }}
						/>
						<span style={{ verticalAlign: 'middle' }}>
							{' '}
							Charts
						</span>
					</Tabs.Tab>
				</Tabs.Tabs>
				<Tabs.TabContent for="table">
					<Suspense fallback={<Loading flex size={2} />}>
						<TagsTable
							tags={tags}
							error={error}
							isReady={hasLoadedAll}
							onCreateTag={createTag}
							onUpdateTag={updateTag}
							onDeleteTag={deleteTag}
						/>
					</Suspense>
				</Tabs.TabContent>
				<Tabs.TabContent for="chart">
					<Suspense fallback={<Loading flex size={2} />}>
						<TagsCharts
							tags={tags}
							error={error}
							isReady={hasLoadedAll}
						/>
					</Suspense>
				</Tabs.TabContent>
			</Tabs.Container>

		</Page>
	);
};

const mapStateToProps = (state) => {
	return {
		hasLoadedAll: state.tags.tags.hasLoadedAll,
		tags: state.tags.tags.items,
		error: state.tags.tags.error,
	};
};

const mapDispatchToProps = {
	getTags,
	createTag,
	updateTag,
	deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);


