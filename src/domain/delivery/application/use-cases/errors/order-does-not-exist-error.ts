import { UseCaseError } from "@/core/errors/use-case-error";

export class OrderDoesNotExistError extends Error implements UseCaseError {
  constructor() {
    super("Order does not exist");
  }
}
