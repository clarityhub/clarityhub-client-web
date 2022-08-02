import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card from '@clarityhub/unity-web/lib/components/Card';
import ItemBadge from 'designsystem/TagEditor/tagTypes/ItemBadge';
import { opacify, saturate } from '@clarityhub/unity-core/lib/utilities/color';

const Highlight = styled.div`
	background-color: ${({ highlighColor }) => {
		return opacify(saturate(highlighColor ? highlighColor : '#C7F9EF', 0.8), 0.6);
	}};
	position: relative;
	display: inline;

	.hideHighlights & {
		background-color: transparent;
	}
`;

const StyledFloatingTags = styled.div`
	position: absolute;
	z-index: 100000;
`;

const useDelayHover = (ref, delay) => {
	const [active, setActive] = useState(false);
	const timeout = useRef();
	const leaveTimeout = useRef();

	const onMouseEnter = (e) => {
		const rect = ref.current.getBoundingClientRect();
		const x = e.clientX - rect.left - 24;
		const y = Math.max(e.clientY - rect.top, 24);

		clearTimeout(leaveTimeout.current);
		timeout.current = setTimeout(() => {
			if (!active) {
				setActive({ x, y });
			}
		}, delay);
	};

	const onMouseLeave = () => {
		clearTimeout(timeout.current);

		leaveTimeout.current = setTimeout(() => {
			setActive(false);
		}, delay);
	};

	return [
		active,
		onMouseEnter,
		onMouseLeave,
	];
};

const TagHighlight = ({ hideHighlights, tags, color, ...props }) => {
	const ref = useRef();
	const [
		active,
		onMouseEnter,
		onMouseLeave,
	] = useDelayHover(ref, 300);

	if (hideHighlights) {
		return <span {...props} />;
	}

	return (
		<Highlight
			highlighColor={color}
			onMouseOver={onMouseEnter}
			onMouseLeave={onMouseLeave}
			ref={ref}
		>
			{active && (
				<StyledFloatingTags style={{ top: active.y + 'px', left: active.x + 'px' }}>
					<Card>
						<Box margin="xsmall">
							{tags.map((tag) => {
								return (
									<div key={tag.tagPath}>
										<ItemBadge tag={tag} />
									</div>
								);
							})}
						</Box>
					</Card>
				</StyledFloatingTags>
			)}
			<span {...props} />
		</Highlight>
	);
};

export default TagHighlight;
