import React, { useState } from 'react';
import { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema/FormFromSchema';
import { TwitterPicker } from 'react-color';
import Label from '@clarityhub/unity-web/lib/forms/Label';
import { colors } from 'designsystem/TagEditor/utilities/pickColor';
import tagSchema from '../utilities/tagSchema';

const CreateTagModal = ({ onClose, onCreate, open, tag }) => {
	const [submitting, setSubmitting] = useState(false);
	return (
		<Modal open={open} onClose={onClose}>
			<CardBody>
				<Typography type="h3">Create Tag</Typography>

				<FormFromSchema
					hideTitle
					submitting={submitting}
					additionalButtons={() => {
						return (
							<Button onClick={onClose}>
                                Cancel
							</Button>
						);
					}}
					formData={{}}
					onSubmit={async (data) => {
						setSubmitting(true);

						try {
							await onCreate(data, {
								tag,
							});
							setSubmitting(false);
						} catch (e) {
							setSubmitting(false);
						}
					}}
					schema={tagSchema}
					uiSchema={{
						color: {
							'ui:field': props => {
								return (
									<div>
										<Label>
                                            Color
										</Label>
										<Box margin={{ top: 'xsmall' }}>
											<TwitterPicker
												colors={colors}
												triangle="hide"
												color={props.formData}
												onChangeComplete={(color) => {
													props.onChange(color.hex);
												}}
											/>
										</Box>
									</div>
								);
							},
						},
					}}
					submitText="Create Tag"
				/>
			</CardBody>
		</Modal>
	);
};

export default CreateTagModal;
