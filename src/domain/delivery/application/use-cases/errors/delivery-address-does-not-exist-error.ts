import { UseCaseError } from "@/core/errors/use-case-error";

export class DeliveryAddressDoesNotExistError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("delivery address does not exist");
  }
}
