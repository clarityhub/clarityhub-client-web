import React, { Component } from 'react';
import { bool } from 'prop-types';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import FullFormLayout from '../layouts/FullFormLayout';
import { withServices } from '../../../services';

export default withServices(class ErrorBoundary extends Component {
    static propTypes = {
    	fullPage: bool,
    }

    state = {
    	hasError: false,
    }

    componentDidCatch(error, info) {
    	this.setState({
    		hasError: true,
    	});

    	this.props.services.Logger.error(error);
    }

    handleClick = (e) => {
    	e.preventDefault();

    	window.location.reload();
    }

    render() {
    	if (this.state.hasError) {
    		const content = (
    			<Notification variant="thin" type="danger">
    				<Typography color="white">Sorry about that</Typography>

    				<Typography color="white">Something went wrong on our end. The issue has been reported to us.</Typography>

    				<Typography color="white">You can try refreshing your window to see if that clears up the issue.</Typography>

    				<Button type="white" onClick={this.handleClick}>
                        Refresh
    				</Button>
    			</Notification>
    		);

    		if (this.props.fullPage) {
    			return (
    				<FullFormLayout>
    					{content}
    				</FullFormLayout>
    			);
    		}

    		return content;
    	}

    	return this.props.children;
    }
});
