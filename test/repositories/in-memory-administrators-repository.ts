import { AdministratorsRepository } from "@/domain/delivery/aplication/repositories/administrators-repository";
import { Administrator } from "@/domain/delivery/enterprise/entites/administrator";

export class InMemoryAdministratorsRepository
  implements AdministratorsRepository
{
  public items: Administrator[] = [];

  async findByCpf(cpf: string): Promise<Administrator | null> {
    const administrator = this.items.find((item) => item.cpf === cpf);

    if (!administrator) {
      return null;
    }

    return administrator;
  }
}
