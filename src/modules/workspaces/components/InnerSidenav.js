import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';

import SidenavItem from 'designsystem/SidenavItem';
import SidenavSeparator from 'designsystem/SidenavSeparator';
import SidenavSection from 'designsystem/SidenavSection';
import { Flag } from 'modules/app/components/Flags';
import Role from 'modules/app/containers/Role';

import config from '../configs/settings';

const SidenavWrapper = styled.div`
    background: #f1f7fd;
    /* box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(50,50,93,0.11); */
    width: 240px;
    height: 100%;
	overflow: auto;
	z-index: 1001;

	@media(max-width: ${breakpoints.tablet}) {
		display: none;
	}
`;

const InnerSidenav = () => {
	return (
		<SidenavWrapper>
			<Fragment>
				{
					config.map((section, index) => {
						return (
							<Box key={`${section}-${index}`}>
								<Box direction="column" flex={1}>
									<SidenavSection>
										{section.title}
									</SidenavSection>

									<Box margin={{ top: 'small' }}>
										{
											section.items.map((item, i) => {
												const content = (
													<SidenavItem
														key={i}
														icon={item.icon}
														title={item.title}
														to={item.to}
													/>
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
									</Box>
									{index !== config.length &&
										<SidenavSeparator />
									}
								</Box>
							</Box>
						);
					})
				}
			</Fragment>
		</SidenavWrapper>
	);
};

export default InnerSidenav;
