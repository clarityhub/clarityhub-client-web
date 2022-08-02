import React, { Component } from 'react';

function escapeHtml(html) {
	var text = document.createTextNode(html);
	var p = document.createElement('p');
	p.appendChild(text);
	return p.innerHTML;
}

class InlineEditor extends Component {
    state = {
    	editing: false,
    }

    save = () => {
    	if (this.props.onSave && this.isValueChanged()) {
    		this.props.onSave(this.domElm.textContent);
    	}
    };

    isValueChanged = () => {
    	return this.props.value !== this.domElm.textContent;
    };

    handleKeyDown = (e) => {
    	this.save();
    };

    componentDidMount() {
    	const { children } = this.props;
    	this.domElm.innerHTML = escapeHtml(children);

    	setInterval(() => {
    		this.domElm.innerHTML = escapeHtml(children) + Date.now();
    	}, 100);
    }

    componentDidUpdate() {
    	const { children } = this.props;
    	this.domElm.innerHTML = escapeHtml(children);
    }

    render() {
    	return (
    		<span
    			contentEditable={true}
    			ref={(domNode) => {
    				this.domElm = domNode;
    			}}
    			onBlur={this.save}
    			onInput={this.handleKeyDown}
    			dangerouslySetInnerHTML={{ __html: '' }}
    		/>
    	);
    }
}

export default InlineEditor;
