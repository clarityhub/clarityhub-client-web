import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Space from '@clarityhub/unity-web/lib/scaffolding/Space';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button from '@clarityhub/unity-web/lib/components/Button';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Img from '@clarityhub/unity-web/lib/components/Image';

const buttonProps = {
	as: 'a',
	type: 'primary',
	target: '_blank',
	rel: 'noopener noreferrer',
};

const STATIC_POSTS = [(
	<Card flat type="callout">
		<CardBody>
			<Box direction="row" gap="medium">
				<Box flex={3}>
					<Typography type="h3">
						Mobile Apps Available!
					</Typography>
					<Typography>
						Get the best Clarity Hub experience on your Android and iOS devices.
					</Typography>
					<Space direction="horizontal">
						<Button {...buttonProps} href={process.env.REACT_APP_IOS_APP_LINK}>
							Download from Apple Store
						</Button>
						<Button {...buttonProps} href={process.env.REACT_APP_ANDROID_APP_LINK}>
							Download from App Store
						</Button>
					</Space>
				</Box>
			</Box>
		</CardBody>
	</Card>
)];

const BlogPosts = ({ posts }) => {
	return (
		<Box margin={{ top: 'medium', bottom: 'medium' }} direction="column" gap="medium">
			{STATIC_POSTS.map((post, i) => {
				return (
					<Box key={i}>
						{post}
					</Box>
				);
			})}
			{posts.map((post, i) => {
				return (
					<Box key={i}>
						<Card>
							<CardBody>
								<Box direction="row" gap="medium">
									<Box flex={1}>
										<Img src={post.image} alt={`${post.title} image`} />
									</Box>
									<Box flex={3}>
										<Typography type="h3">
											{post.title}
										</Typography>
										<Typography>
											{post.summary}
										</Typography>
										<Typography>
											<a href={post.url} target="_blank" rel="noreferrer noopener">Continue Reading</a>
										</Typography>
									</Box>
								</Box>
							</CardBody>
					    </Card>
					</Box>
				);
			})}

			<Box margin={{ top: 'small' }}>
				<Typography color="darkGray" center>
                    Read more on <a href="https://stellar.clarityhub.io" target="_blank" rel="noreferrer noopener">our blog</a>
				</Typography>
			</Box>
		</Box>
	);
};

BlogPosts.propTypes = {
	posts: arrayOf(shape({
		image: string,
		title: string,
		summary: string,
		url: string,
	})),
};

BlogPosts.defaultProps = {
	posts: [],
};

export default BlogPosts;
