import { connect } from 'react-redux';
import { AccessControl } from 'accesscontrol';

const GUEST = 'guest';
const MEMBER = 'member';
const ADMIN = 'admin';

// TODO request as JSON from server
// Note: Copied from server

const ac = new AccessControl();
ac.grant(GUEST)
	.readOwn('workspace')
	.readAny('member')
	.readAny('interview')
	.readAny('interviewV2')
	.readAny('tag')
	.readAny('media');

ac.grant(MEMBER)
	.extend(GUEST)
	.create('workspace')
	.create('interview')
	.deleteOwn('interview')
	.updateAny('interview')
	.create('interviewV2')
	.deleteOwn('interviewV2')
	.updateAny('interviewV2')
	.create('tag')
	.updateAny('tag')
	.deleteAny('tag')
	.create('media')
	.updateAny('media')
	.deleteOwn('media');

ac.grant(ADMIN)
	.extend(GUEST)
	.extend(MEMBER)
	.create('member')
	.updateAny('member')
	.deleteAny('member')
	.updateAny('workspace')
	.deleteOwn('workspace')
	.deleteAny('interview')
	.deleteAny('media')
	.updateAny('billing')
	.readAny('billing')
	.deleteAny('billing')
	.readAny('integrations')
	.create('integrations')
	.updateAny('integrations')
	.deleteAny('integrations');

const can = (role, action, resource) => {
	return ac.can(role)[action](resource).granted;
};

const Role = ({ resource, action = 'readAny', me, render }) => {
	if (can(me.role, action, resource)) {
		return render();
	}

	return null;
};

const mapStateToProps = (state) => {
	return {
		me: state.members.me,
	};
};

export default connect(mapStateToProps)(Role);
