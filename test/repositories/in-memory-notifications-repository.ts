import { NotificationsReposirory } from "@/domain/notification/aplication/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository
  implements NotificationsReposirory
{
  public items: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => {
      return item.id.toString() == id;
    });

    if (!notification) {
      return null;
    }

    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.equals(notification);
    });

    if (index === -1) {
      throw new Error("Notification does not exist");
    }

    this.items[index] = notification;
  }
}
