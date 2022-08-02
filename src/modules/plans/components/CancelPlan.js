import React, { Fragment, useState, useCallback } from 'react';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import Typography from '@clarityhub/unity-web/lib/components/Typography/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Card, { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

const CancelPlan = ({ refresh, cancelSub, billing, getBilling }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const onClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);
	const onOpen = useCallback(() => {
		setOpen(true);
	}, [setOpen]);
	const onAction = useCallback(async () => {
		setLoading(true);

		try {
			await cancelSub();

			await refresh();

			await getBilling();

			setLoading(false);
			setOpen(false);
		} catch (e) {
			setError(e);
			setLoading(false);
		}

	}, [cancelSub, getBilling, refresh]);

	return (
		<Fragment>
			<Modal open={open} onClose={onClose}>
				<CardBody>
					<Typography type="h3">Cancel Subscription</Typography>
					{
						error &&
							<Error error={error} />

					}
					<Typography type="text">Are you sure you want to cancel your plan subscription?</Typography>
					<Typography type="text">
                        Your workspace will be put into read-only mode at the end of the current
                        billing cycle.
					</Typography>

					<CardActions>
						<ButtonSet>
							<Button text onClick={onClose} disabled={loading}>
                                Take Me Back
							</Button>
							<Button
								type="danger"
								onClick={onAction}
								disabled={loading}
								loading={loading}
							>
                                Yes, Cancel Subscription
							</Button>
						</ButtonSet>
					</CardActions>
				</CardBody>
			</Modal>
			<Box margin={{ top: 'small' }}>
				<div>
					{
						billing.billingStatus === 'cancelled' && (
							<Box margin={{ bottom: 'small' }}>
								<Card flat type="highlight">
									<CardBody>
										<Typography>
                                            You have cancelled your plan subscription. You will no longer be charged.
										</Typography>
									</CardBody>
								</Card>
							</Box>
						)
					}
					<Button type="danger" onClick={onOpen} disabled={billing.billingStatus === 'cancelled'}>
                        Cancel Subscription
					</Button>

					<Typography>
                        Your workspace will be put into read-only mode at the end of the current
                        billing cycle.
					</Typography>
				</div>
			</Box>

		</Fragment>
	);
};

export default CancelPlan;
