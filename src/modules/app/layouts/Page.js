import React, { Fragment, useCallback } from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

import Content from 'modules/app/components/Content';
import AppBreadcrumbs from 'modules/app/containers/AppBreadcrumbs';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box/';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Icon from '@mdi/react';
import {
	mdiChevronLeft,
} from '@mdi/js';

const StyledButton = styled.button`
    background: none;
    border: 0;
`;

const Page = ({ history, title, icon, crumbs, hideTitle = false, includesInnerSidenav = false, children, goBack = false }) => {
	const onGoBack = useCallback(() => {
		history.goBack();
	}, [history]);


	return (
		<Fragment>
			<Helmet>
				<title>{title} – Clarity Hub</title>
			</Helmet>
			<AppBreadcrumbs
				includesInnerSidenav={includesInnerSidenav}
				crumbs={crumbs}
			/>

			<Content>
				{!hideTitle && (
					<Typography type="h2" noMargin noPadding>
						{goBack && (
							<Fragment>
								<StyledButton text onClick={onGoBack}>
									<Icon
										path={mdiChevronLeft}
										color="currentColor"
										title={'Go back'}
										size="1.1rem"
									/>
								</StyledButton>
								{' '}
							</Fragment>
						)}
						{icon && (
							<span style={{ verticalAlign: 'top' }}>
								<Icon
									path={icon}
									color="currentColor"
									title={title}
									size={1.4}
								/>
							</span>
						)} {title}
					</Typography>
				)}

				<Box margin={{ top: 'medium', bottom: 'medium' }} flex={1}>
					{children}
				</Box>
			</Content>
		</Fragment>
	);
};

export default withRouter(Page);
