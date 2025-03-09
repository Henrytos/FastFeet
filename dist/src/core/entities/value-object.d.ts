export declare class ValueObject<Props> {
    protected props: Props;
    protected constructor(props: Props);
    equal(vo: ValueObject<unknown>): boolean;
}
