import { Administrator } from '@/domain/delivery/enterprise/entities/administrator'

export class AdministratorPresenter {
  static toHTTP(administrator: Administrator) {
    return {
      id: administrator.id.toString(),
      name: administrator.name,
      cpf: administrator.cpf.value,
      role: 'ADMINISTRATOR',
    }
  }
}
