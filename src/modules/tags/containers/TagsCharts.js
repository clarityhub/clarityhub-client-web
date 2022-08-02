import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	getTagItemsStatistics,
} from '../store/actions';

import TagsCharts from '../components/TagsCharts';

const TagsChartsContainer = ({ getTagItemsStatistics, hasLoadedStats, ...props }) => {
	useEffect(() => {
		getTagItemsStatistics();
	}, [getTagItemsStatistics]);

	return (
		<TagsCharts
			{...props}
		/>
	);
};

const mapStateToProps = (state, props) => {
	return {
		hasLoadedStats: state.tags.tagItems.hasLoadedStats,
		tagItemsStats: state.tags.tagItems.stats,
		error: state.tags.tagItems.error || props.error,
	};
};

const mapDispatchToProps = {
	getTagItemsStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsChartsContainer);
