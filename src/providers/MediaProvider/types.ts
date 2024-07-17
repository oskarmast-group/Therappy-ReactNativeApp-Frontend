export enum DEVICES_TYPES {
  AUDIO_INPUT = 'audioinput',
  AUDIO_OUTPUT = 'audiooutput',
  VIDEO_INPUT = 'videoinput',
}

export type DeviceInfo = {
  deviceId: string;
  kind: DEVICES_TYPES;
  label: string;
  groupId: string;
  facing: string;
};

export interface DevicesList {
  [DEVICES_TYPES.AUDIO_INPUT]: DeviceInfo[];
  [DEVICES_TYPES.AUDIO_OUTPUT]: DeviceInfo[];
  [DEVICES_TYPES.VIDEO_INPUT]: DeviceInfo[];
}

export interface SelectedDevices {
  [DEVICES_TYPES.AUDIO_INPUT]: string;
  [DEVICES_TYPES.AUDIO_OUTPUT]: string;
  [DEVICES_TYPES.VIDEO_INPUT]: string;
}
