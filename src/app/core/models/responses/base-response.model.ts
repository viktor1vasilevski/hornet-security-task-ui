import { NotificationTypeEnum } from "../../enums/notification-type.enum";

export interface BaseResponse {
    success: boolean;
    message: string;
    notificationType: NotificationTypeEnum;
  }