import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Menu } from '@clarityhub/unity-web/lib/components/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';
import {
	mdiDotsVertical,
} from '@mdi/js';
import Icon from '@mdi/react';

const MenuWrapper = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    z-index: 3;
`;

const MenuItemRenderer = ({ menuItems, item }) => {
	const popover = useRef(null);

	return (
		<MenuWrapper>
			{menuItems && (
				<Menu
					ref={popover}
					items={menuItems({
						item,
						getRef() {
							return popover;
						},
					})}
				>
					{({ open }) => (
						<Button text onClick={open}>
							<Icon
								path={mdiDotsVertical}
								color="currentColor"
								title={'Open options'}
								size="1.1rem"
							/>
						</Button>
					)}
				</Menu>
			)}
		</MenuWrapper>
	);
};

export default MenuItemRenderer;
