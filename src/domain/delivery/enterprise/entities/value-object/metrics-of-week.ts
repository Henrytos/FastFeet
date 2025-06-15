import { ValueObject } from '@/core/entities/value-object'

interface MetricsOfWeekProps {
  orderDelivered: number
  orderCanceled: number
}

export class MetricsOfWeek extends ValueObject<MetricsOfWeekProps> {
  public static create(props: MetricsOfWeekProps) {
    const metricsOfWeek = new MetricsOfWeek(props)

    return metricsOfWeek
  }

  get orderDelivered(): number {
    return this.props.orderDelivered
  }

  get orderCanceled(): number {
    return this.props.orderCanceled
  }
}
