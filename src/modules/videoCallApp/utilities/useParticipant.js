import { useState, useEffect } from 'react';

import { trackpubsToTracks } from './video';

export default function useParticipant({
	participant,
	videoRef,
	audioRef,
}) {
	const [videoTracks, setVideoTracks] = useState([]);
	const [audioTracks, setAudioTracks] = useState([]);
	const [hideVideo, setHideVideo] = useState(false);
	const [muted, setMuted] = useState(false);

	const isLocal = participant.constructor.name.includes('Local');

	useEffect(() => {
		setVideoTracks(trackpubsToTracks(participant.videoTracks));
		setAudioTracks(trackpubsToTracks(participant.audioTracks));

		const trackSubscribed = (track) => {
			if (track.kind === 'video') {
				setVideoTracks((videoTracks) => [...videoTracks, track]);
			} else if (track.kind === 'audio') {
				setAudioTracks((audioTracks) => [...audioTracks, track]);
			}
		};

		const localTrackSubscribed = (track) => {
			if (track.kind === 'video') {
				setVideoTracks((videoTracks) => [...videoTracks, track.track ? track.track : track]);
			} else if (track.kind === 'audio') {
				setAudioTracks((audioTracks) => [...audioTracks, track.track ? track.track : track]);
			}
		};

		const trackUnsubscribed = (track) => {
			if (track.kind === 'video') {
				setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
			} else if (track.kind === 'audio') {
				setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
			}
		};

		const localTrackUnsubscribed = (track) => {
			if (track.kind === 'video') {
				setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
			} else if (track.kind === 'audio') {
				setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
			}
		};

		const trackEnabled = (track) => {
			if (track.kind === 'video') {
				setHideVideo(false);
			} else {
				setMuted(false);
			}
		};

		const trackDisabled = (track) => {
			if (track.kind === 'video') {
				setHideVideo(true);
			} else {
				setMuted(true);
			}
		};

		participant.on('trackSubscribed', trackSubscribed);
		participant.on('trackUnsubscribed', trackUnsubscribed);
		participant.on('trackEnabled', trackEnabled);
		participant.on('trackDisabled', trackDisabled);

		if (isLocal) {
			participant.on('trackPublished', localTrackSubscribed);
			participant.on('trackUnpublished', trackUnsubscribed);
			participant.on('trackStopped', localTrackUnsubscribed);
		}

		return () => {
			setVideoTracks([]);
			setAudioTracks([]);
			participant.removeListener('trackSubscribed', trackSubscribed);
			participant.removeListener('trackUnsubscribed', trackUnsubscribed);
			participant.removeListener('trackEnabled', trackEnabled);
			participant.removeListener('trackDisabled', trackDisabled);

			if (isLocal) {
				participant.removeListener('trackPublished', localTrackSubscribed);
				participant.removeListener('trackUnpublished', trackUnsubscribed);
				participant.removeListener('trackStopped', localTrackUnsubscribed);
			}
		};
	}, [isLocal, participant]);

	useEffect(() => {
		const videoTrack = videoTracks.slice(-1).pop();
		if (videoTrack) {
			const ref = videoRef.current;
			videoTrack.attach(ref);
			return () => {
				videoTrack.detach(ref);
			};
		}
		return () => {};
	}, [videoRef, videoTracks, hideVideo]);

	useEffect(() => {
		const audioTrack = audioTracks[0];
		if (audioTrack) {
			const ref = audioRef.current;
			audioTrack.attach(ref);
			return () => {
				audioTrack.detach(ref);
			};
		}
		return () => {};
	}, [audioRef, audioTracks]);

	return {
		muted,
		hideVideo,
	};
}
