import React from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import DoneSVG from './DoneSVG';

const UpgradePlanSuccess = ({ history }) => {
	return (
		<Box>
			<Box style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
				<Box margin={{ top: 'small', bottom: 'small' }}>
					<DoneSVG style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }} />
				</Box>
				<Typography type="h2" center noMargin>
                    Plan Upgraded!
				</Typography>

				<Typography center>
                    You have successfully changed your plan.
				</Typography>

				<Box margin={{ top: 'large' }}>
					<div style={{ textAlign: 'center' }}>
						<LinkButton type="primary" center history={history} to="/settings/plans">
                            Go to Plans
			            </LinkButton>
					</div>
				</Box>
			</Box>
		</Box>
	);
};

export default withRouter(UpgradePlanSuccess);
