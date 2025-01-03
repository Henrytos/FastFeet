export class Cpf {
  private _value: string

  get value() {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string) {
    return new Cpf(value)
  }

  static createFromValue(cpf: string) {
    cpf = cpf.replace(/\D/g, '')

    if (cpf.length !== 11) {
      throw new Error('O número deve conter exatamente 11 dígitos.')
    }
  }
}
