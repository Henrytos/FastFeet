export declare class UniqueEntityID {
    private value;
    constructor(id?: string);
    toString(): string;
    toValue(): string;
    equals(id: UniqueEntityID): boolean;
}
