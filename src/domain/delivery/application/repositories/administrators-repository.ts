import { Administrator } from '@/domain/delivery/enterprise/entities/administrator'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'

export abstract class AdministratorsRepository {
  abstract findByCpf(cpf: Cpf): Promise<Administrator | null>
  abstract findById(id: string): Promise<Administrator | null>
  abstract create(administrator: Administrator): Promise<void>
}
