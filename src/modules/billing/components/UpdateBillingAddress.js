/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';

import Button from '@clarityhub/unity-web/lib/components/Button';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import billingSchema from '../utilities/billingSchema';

import { updateBilling } from '../store/actions';

const UpdateBillingAddress = ({ updateAddress, billing, onCancel }) => {
	return (
		<FormFromSchema
			hideTitle
			additionalButtons={() => {
				return <Button onClick={onCancel}>Cancel</Button>;
			}}
			formData={billing}
			onSubmit={updateAddress}
			schema={billingSchema}
		/>
	);
};

const mapDispatchToProps = {
	updateAddress: updateBilling,
};

export default connect(
	null,
	mapDispatchToProps,
)(UpdateBillingAddress);
