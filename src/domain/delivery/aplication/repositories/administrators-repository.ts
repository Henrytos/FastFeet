import { Administrator } from "../../enterprise/entites/administrator";

export interface AdministratorsRepository {
  findByCpf(cpf: string): Promise<Administrator | null>;
}
