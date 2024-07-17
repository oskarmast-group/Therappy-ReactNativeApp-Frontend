import {DEVICES_TYPES, DevicesList, SelectedDevices} from './types';

export const DEFAULT_CAPTURE_OPTIONS: any = {
  audio: true,
  video: true,
};

export const DEFAULT_SELECTED_DEVICES: SelectedDevices = {
  [DEVICES_TYPES.AUDIO_INPUT]: '',
  [DEVICES_TYPES.AUDIO_OUTPUT]: '',
  [DEVICES_TYPES.VIDEO_INPUT]: '',
};

export const DEFAULT_DEVICES_LIST: DevicesList = {
  [DEVICES_TYPES.AUDIO_INPUT]: [],
  [DEVICES_TYPES.AUDIO_OUTPUT]: [],
  [DEVICES_TYPES.VIDEO_INPUT]: [],
};
