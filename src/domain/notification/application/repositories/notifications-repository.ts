import { Notification } from "../../enterprise/entities/notification";

export interface NotificationsReposirory {
  create(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  save(notification: Notification): Promise<void>;
}
