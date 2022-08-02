/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { Link } from 'react-router-dom';

const DashboardCallout = ({ children, to }) => {
	return (
		<Link to={to} css={css`
            text-decoration: none;
        `}>
			<Card hoverable>
				<CardBody>
					{children}
				</CardBody>
			</Card>
		</Link>
	);
};

export default DashboardCallout;
