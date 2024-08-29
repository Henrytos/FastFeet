import { randomUUID } from "node:crypto";

export class UnqiueEntityID {
  private value: string;

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  toString(): string {
    return this.value.toString();
  }

  toValue(): string {
    return this.value;
  }
}
