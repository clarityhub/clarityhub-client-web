/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Link } from 'react-router-dom';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Icon from '@mdi/react';

import { GridLayout, GridItem } from '@clarityhub/unity-web/lib/scaffolding/Grid';
import { Flag } from 'modules/app/components/Flags';
import Role from 'modules/app/containers/Role';

import config from '../configs/settings';

const Separator = styled.div`
    margin-top: 2rem;
`;

const SettingsList = () => {
	return (
		<Fragment>
			{
				config.map((section, index) => {
					return (
						<Fragment>
							<Box direction="column" flex={1}>
								<Typography type="h3" noMargin noPadding>
									{section.title}
								</Typography>

								<Box margin={{ top: 'small' }}>
									<GridLayout>
										{
											section.items.map((item, i) => {
												const content = (
													<GridItem key={i}>
														<Link to={item.to} css={css`
                                                                text-decoration: none;
                                                            `}>
															<Card hoverable>
																<CardBody>
																	<Typography type="h4" noMargin noPadding>
																		<Icon
																			path={item.icon}
																			color="currentColor"
																			title={item.title}
																			size="1.1rem"
																		/>
																		{' '}
																		{item.title}
																	</Typography>
																</CardBody>
															</Card>
														</Link>
													</GridItem>
												);

												let render = content;

												if (item.role) {
													const [resource, action] = item.role;
													render = (
														<Role
															key={i}
															resource={resource}
															action={action}
															render={() => content
															}
														/>
													);
												}

												if (item.flag) {
													render = (
														<Flag
															key={i}
															name={item.flag}
															render={() => content}
														/>
													);
												}

												return (
													render
												);
											})
										}
									</GridLayout>
								</Box>
								{index !== config.length &&
									<Separator />
								}
							</Box>
						</Fragment>
					);
				})
			}
		</Fragment>
	);
};

export default SettingsList;
