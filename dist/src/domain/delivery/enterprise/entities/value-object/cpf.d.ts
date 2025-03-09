export declare class Cpf {
    private _value;
    get value(): string;
    private constructor();
    static create(value: string): Cpf;
    static createFromValue(cpf: string): Cpf;
    private isValidCpf;
}
