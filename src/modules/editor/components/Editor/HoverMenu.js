import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Icon from '@mdi/react';
import colors from '@clarityhub/unity-core/lib/colors';
import { Menu } from '@clarityhub/unity-web/lib/components/Menu';
import {
	mdiChevronUp,
	mdiFormatBold,
	mdiFormatItalic,
	mdiFormatUnderline,
	mdiCodeTags,
	mdiFormatTitle,
	mdiFormatQuoteClose,
	mdiFormatListBulleted,
	mdiFormatListNumbered,
	mdiLinkVariant,
} from '@mdi/js';
import { Flag } from 'modules/app/components/Flags';

import StyledButton from './menuItems/StyledButton';
import InlineButton from './menuItems/InlineButton';
import TagButton from './menuItems/TagButton';
import MarkButton from './menuItems/MarkButton';
import BlockButton from './menuItems/BlockButton';
import TranscriptQuoteButton from './menuItems/TranscriptQuoteButton';

const StyledMenu = styled.div`
    /* padding: 8px 7px 6px; */
    position: absolute;
    z-index: 1002;
    top: -10000px;
    left: -10000px;
    margin-top: -6px;
    opacity: 0;
    background-color: ${colors.white.default};
	box-shadow: ${colors.shadow.default};
    border-radius: 4px;
    transition: opacity 0.75s;

    & > * {
        display: inline-block;
    }
    & > * + * {
        margin-left: 0;
    }
`;

const Separator = styled.div`
    height: 1.2rem;
    border: 0.5px solid gray;
    margin-left: 4px;
    margin-right: 4px;
    vertical-align: text-bottom;
`;

const HoverMenu = React.forwardRef(({
	editor,
	minimalActions,
	hoverMenuTimestamp,
	referencePath,
}, ref) => {
	const root = window.document.body;

	return ReactDOM.createPortal(
		<StyledMenu ref={ref}>
			{!minimalActions && (
				<Menu
					updateTimestamp={hoverMenuTimestamp}
					content={(
						<Fragment>
							<MarkButton
								editor={editor}
								fullWidth
								showText
								type="code"
								readable="Code"
								icon={mdiCodeTags}
							/>
							<BlockButton
								editor={editor}
								fullWidth
								showText
								type="heading-one"
								readable="Heading"
								icon={mdiFormatTitle}
							/>
							<BlockButton
								editor={editor}
								fullWidth
								showText
								type="block-quote"
								readable="Quote"
								icon={mdiFormatQuoteClose}
							/>
							<BlockButton
								editor={editor}
								fullWidth
								showText
								type="bulleted-list"
								readable="Bulleted List"
								icon={mdiFormatListBulleted}
							/>
							<BlockButton
								editor={editor}
								fullWidth
								showText
								type="numbered-list"
								readable="Numbered List"
								icon={mdiFormatListNumbered}
							/>
						</Fragment>
					)}
				>
					{({ open }) => (
						<StyledButton onClick={open}>
							<Icon
								path={mdiChevronUp}
								vertical
								color="currentColor"
								title={'Text options'}
								size={0.8}
							/>
							{' '}
							Text
						</StyledButton>
					)}
				</Menu>
			)}
			{!minimalActions && <Separator />}
			<MarkButton editor={editor} type="bold" icon={mdiFormatBold} />
			<MarkButton editor={editor} type="italic" icon={mdiFormatItalic} />
			<MarkButton editor={editor} type="underlined" icon={mdiFormatUnderline} />
			<InlineButton editor={editor} type="link" icon={mdiLinkVariant} />
			<Flag
				name={['features', 'editorTags']}
				render={() => (
					<Fragment>
						<Separator />
						<TagButton
							editor={editor}
							referencePath={referencePath}
						/>
					</Fragment>
				)}
			/>
			<TranscriptQuoteButton editor={editor} />
		</StyledMenu>,
		root,
	);
});

export default HoverMenu;
