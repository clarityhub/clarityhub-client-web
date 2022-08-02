/** @jsx jsx */
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card, { CardHeader, CardFooter, CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';
import ReadOnlyTagList from 'modules/tags/containers/ReadOnlyTagList';

const PreviewEditor = React.lazy(() => import('modules/editor/components/PreviewEditor'));

const NotebookItemRenderer = ({ item }) => {
	const [locale] = useLocale();

	return (
		<Link to={`/notebooks/${item.id}`} css={css`
			text-decoration: none;
			flex: 1;
    		display: flex;

			${Card} {
				flex: 1;
			}
		`}>
			<Card>
				<CardHeader css={{ paddingRight: '3rem' }}>
					{item.title}
				</CardHeader>
				<CardBody>
					<Box margin={{ bottom: 'small' }}>
						<ReadOnlyTagList
							itemType="interview"
							itemId={item.id}
						/>
					</Box>

					{
						item.content && (
							<Suspense fallback={<Loading />}>
								<PreviewEditor content={item.content} />
							</Suspense>
						)
					}
				</CardBody>
				<CardFooter>
					Last Updated
					{' '}
					{new Date(item.updatedAt).toLocaleDateString(locale)}
				</CardFooter>
			</Card>
		</Link>
	);
};

export default NotebookItemRenderer;
