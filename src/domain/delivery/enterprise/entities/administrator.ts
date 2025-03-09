import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Cpf } from './value-object/cpf'

export interface AdministratorProps {
  cpf: Cpf
  password: string
  name: string
}

export class Administrator extends Entity<AdministratorProps> {
  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  get name() {
    return this.props.name
  }

  static create(props: AdministratorProps, id?: UniqueEntityID) {
    const administrator = new Administrator(props, id)

    return administrator
  }
}
