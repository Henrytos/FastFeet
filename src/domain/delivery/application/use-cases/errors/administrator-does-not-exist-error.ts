import { UseCaseError } from "@/core/errors/use-case-error";

export class AdministratorDoesNotExistError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Administrator does not exist");
  }
}
