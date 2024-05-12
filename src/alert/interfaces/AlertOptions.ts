import ALERT_TYPES from './AlertTypes';
import { ConfirmDialogConfig, CustomDialogConfig, InfoDialogConfig } from './DialogConfig';

interface BaseOptions {
  type: ALERT_TYPES;
  config: { [key: string]: any };
}

interface InfoAlertOptions extends BaseOptions {
  type: ALERT_TYPES.INFO;
  config: InfoDialogConfig;
}

interface ConfirmAlertOptions extends BaseOptions {
  type: ALERT_TYPES.CONFIRM;
  config: ConfirmDialogConfig;
}

interface CustomAlertOptions<P = any> extends BaseOptions {
  type: ALERT_TYPES.CUSTOM;
  config: CustomDialogConfig<P>;
}

type AlertOptions<P = any> = InfoAlertOptions | ConfirmAlertOptions | CustomAlertOptions<P>;

export default AlertOptions;
