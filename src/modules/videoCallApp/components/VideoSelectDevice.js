import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Menu, MenuItem } from '@clarityhub/unity-web/lib/components/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';
import Label from '@clarityhub/unity-web/lib/forms/Label';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';

const VideoSelectDevice = ({ deviceId, deviceType = 'videoinput', onChangeDevice }) => {
	const [devices, setDevices] = useState([]);
	const menuRef = useRef();

	const getListOfDevices = useCallback(async () => {
		const d = await navigator.mediaDevices.enumerateDevices();

		const cameras = d.filter(entry => entry.kind === deviceType);

		setDevices(cameras);
	}, [deviceType]);

	useEffect(() => {
		getListOfDevices();
	}, [getListOfDevices]);

	const handleSelectDevice = useCallback((nextDeviceId) => (e) => {
		e.preventDefault();

		menuRef.current.close();
		onChangeDevice(nextDeviceId, deviceType);
	}, [deviceType, onChangeDevice]);

	const currentDevice = devices.find(d => d.deviceId === deviceId);

	return (
		<Box margin={{ bottom: 'small' }}>
			<InputGroup>
				<Label>{deviceType === 'videoinput' ? 'Video Camera' : 'Audio Device'}</Label>

				<Menu
					ref={menuRef}
					items={
						devices.map((device) => {
							return (
								<MenuItem key={device.deviceId} value={device.deviceId} onClick={handleSelectDevice(device.deviceId)}>
									{device.label}
								</MenuItem>
							);
						})}
				>
					{({ open, close, toggle }) => <Button onClick={toggle}>{currentDevice && currentDevice.label}</Button>}
				</Menu>
			</InputGroup>
		</Box>
	);
};

export default VideoSelectDevice;
