import { ValueObject } from '@/core/entities/value-object';
interface MetricsOfWeekProps {
    orderDelivered: number;
    orderCanceled: number;
}
export declare class MetricsOfWeek extends ValueObject<MetricsOfWeekProps> {
    static create(props: MetricsOfWeekProps): MetricsOfWeek;
    get orderDelivered(): number;
    get orderCanceled(): number;
}
export {};
