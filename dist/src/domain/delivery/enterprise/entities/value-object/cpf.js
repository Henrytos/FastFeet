"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpf = void 0;
class Cpf {
    get value() {
        return this._value;
    }
    constructor(value) {
        const isValidCpf = this.isValidCpf(value);
        if (!isValidCpf) {
            throw new Error('CPF inválido.');
        }
        this._value = value;
    }
    static create(value) {
        return new Cpf(value);
    }
    static createFromValue(cpf) {
        if (cpf.length !== 11) {
            throw new Error('O número deve conter exatamente 11 dígitos.');
        }
        return new Cpf(cpf);
    }
    isValidCpf(cpf) {
        let Soma = 0;
        let Resto = 0;
        const strCPF = String(cpf).replace(/[^\d]/g, '');
        if (strCPF.length !== 11)
            return false;
        if ([
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999',
        ].indexOf(strCPF) !== -1)
            return false;
        for (let i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if (Resto === 10 || Resto === 11)
            Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10)))
            return false;
        Soma = 0;
        for (let i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if (Resto === 10 || Resto === 11)
            Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11)))
            return false;
        return true;
    }
}
exports.Cpf = Cpf;
//# sourceMappingURL=cpf.js.map