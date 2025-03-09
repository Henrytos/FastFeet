import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DeliveryAddressProps {
  state: string
  city: string
  neighborhood: string
  street: string
  zip: string
  number: string
  latitude: number
  longitude: number
}

export class DeliveryAddress extends Entity<DeliveryAddressProps> {
  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
  }

  get zip() {
    return this.props.zip
  }

  set zip(zip: string) {
    this.props.zip = zip
  }

  get number() {
    return this.props.number
  }

  set number(number: string) {
    this.props.number = number
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  static create(props: DeliveryAddressProps, id?: UniqueEntityID) {
    const deliveryAddress = new DeliveryAddress(props, id)

    return deliveryAddress
  }
}
