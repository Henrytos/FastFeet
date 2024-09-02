import { Entity } from "@/core/entities/entity";

interface DeliveryAddressProps {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  zip: string;
  number: string;
  latitude: number;
  longitude: number;
}

export class DeliveryAddress extends Entity<DeliveryAddressProps> {
  get state() {
    return this.props.state;
  }

  get city() {
    return this.props.city;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get street() {
    return this.props.street;
  }

  get zip() {
    return this.props.zip;
  }

  get number() {
    return this.props.number;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  static create(props: DeliveryAddressProps) {
    const deliveryAddress = new DeliveryAddress(props);

    return deliveryAddress;
  }
}
