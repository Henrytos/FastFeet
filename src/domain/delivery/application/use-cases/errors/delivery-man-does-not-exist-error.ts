import { UseCaseError } from "@/core/errors/use-case-error";

export class DeliveryManDoesNotExistError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Administrator does not exist");
  }
}
