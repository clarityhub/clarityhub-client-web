import React, { Fragment, useState } from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';

import { VictoryPie, VictoryContainer } from 'victory';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

const hasCategory = (tagId, categories) => {
	return categories.findIndex(c => c.tagId === tagId);
};

const tagsToCategories = (tags) => {
	const categories = [];

	tags.forEach((tag) => {
		if (tag.parentTagId) {
			// Add to parent
			let index = hasCategory(tag.parentTagId, categories);

			if (index === -1) {
				// create a placeholder
				categories.push({
					tagId: tag.parentTagId,
					children: [],
				});
				index = categories.length - 1;
			}

			// add as child
			categories[index].children.push(tag);
		} else {
			// Create/update entry
			let index = hasCategory(tag.tagId, categories);

			if (index === -1) {
				// add
				categories.push({
					...tag,
					children: [],
				});
			} else {
				categories[index] = {
					...tag,
					children: categories[index].children,
				};
			}
		}
	});

	return categories;
};

const categoriesToData = (categories, tagItemsStats) => {
	return categories.map((c) => {
		let count = 0;

		Object.keys(tagItemsStats).forEach((key) => {
			if (key.startsWith(`${c.tagPath}:`)) {
				count += tagItemsStats[key];
			}
		});

		if (count === 0) {
			return false;
		}

		return {
			x: `${c.tag} (${count})`,
			y: count,
			fill: c.color,
			tagPath: c.tagPath,
		};
	}).filter(Boolean);
};

const tagsToData = (tags, activeCategory, tagItemsStats) => {
	return tags.map((t) => {
		let count = 0;

		if (t.tagPath.startsWith(`${activeCategory}:`)) {
			const stat = tagItemsStats[t.tagPath];

			if (stat) {
				count += stat;
			}

			if (count === 0) {
				return false;
			}

			return {
				x: `${t.tag} (${count})`,
				y: count,
				fill: t.color,
				tagPath: t.tagPath,
			};
		}

		return false;
	}).filter(Boolean);
};

const pieChartProps = {
	containerComponent: <VictoryContainer responsive={false}/>,
	padAngle: 1,
	innerRadius: 70,
	height: 250,
	padding: { top: 20, bottom: 20, right: 100, left: 100 },
	radius: 90,
	style: {
		data: {
			fill: ({ datum }) => datum.fill,
		},
	},
};

const TagsTable = ({
	tags,
	tagItemsStats,
	error,
	isReady,
}) => {
	const [activeCategory, setActiveCategory] = useState();
	let content;

	if (error) {
		content = <Error error={error} />;
	} else if (!isReady) {
		content = <Loading flex size={2} />;
	} else {
		// TODO empty state
		// TODO cache result so we don't constantly re-compute
		const categories = tagsToCategories(tags);
		const catData = categoriesToData(categories, tagItemsStats);
		const tagData = activeCategory && tagsToData(tags, activeCategory, tagItemsStats);

		if (!catData || catData.length === 0) {
			return (
				<Box margin={{ top: 'large' }}>
					<Card>
						<CardBody>
							<Typography type="h3" center>No Tag Data</Typography>

							<Typography center>
								Your category and tag usage charts will display here once you have
								tagged Notebooks or Interviews.
							</Typography>
						</CardBody>
					</Card>
				</Box>
			);
		}

		content = (
			<Box margin={{ top: 'medium' }} direction="row">
				<Box>
					<Typography type="h3" center>Categories</Typography>
					<VictoryPie
						{...pieChartProps}
						data={catData}
						events={[
							{
								target: 'data',
								eventHandlers: {
									onClick: () => {
										return [{
											target: 'data',
											eventKey: 'all',
											mutation: () => null,
										}, {
											target: 'data',
											mutation: (props) => {
												setActiveCategory(props.datum.tagPath);
												return props.innerRadius === 70 ?
													{ innerRadius: 60, radius: 100 } : { innerRadius: 70, radius: 90 };
											},
										}];
									},
								},
							},
						]}
					/>
				</Box>
				{activeCategory && (
					<Box>
						<Typography type="h3" center>Tags</Typography>
						<VictoryPie
							{...pieChartProps}
							data={tagData}
							style={{
								data: {
									fill: ({ datum }) => datum.fill,
								},
							}}
						/>
					</Box>
				)}
			</Box>
		);
	}

	return (
		<Fragment>
			<Box>
				{content}
			</Box>
		</Fragment>
	);
};

export default TagsTable;
