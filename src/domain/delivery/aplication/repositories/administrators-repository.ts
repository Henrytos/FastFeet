import { Administrator } from "../../enterprise/entites/administrator";
import { Cpf } from "../../enterprise/entites/value-object/cpf";

export interface AdministratorsRepository {
  findByCpf(cpf: Cpf): Promise<Administrator | null>;
  findById(id: string): Promise<Administrator | null>;
}
