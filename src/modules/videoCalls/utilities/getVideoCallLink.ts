import { VideoCall } from './types';

/**
 * Generate a link to the video call session
 *
 * Automatically adds the password for a magic link
 * 
 * @param {VideoCall} videoCall 
 */
export default function getVideoCallLink(videoCall: VideoCall, token?: string): string {
    const prefix = document.location.origin;

    const magicToken = token ? `&token=${token}` : '';

    return `${prefix}/v/${videoCall.shortId}?p=${btoa(videoCall.password)}${magicToken}`;
}