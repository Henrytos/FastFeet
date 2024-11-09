import { Administrator } from '@/domain/delivery/enterprise/entities/administrator'

export class AdministratorPresenter {
  static toHTTP(administrator: Administrator) {
    return {
      name: administrator.name,
      cpf: administrator.cpf.value,
      role: 'ADMINISTRATOR',
    }
  }
}
