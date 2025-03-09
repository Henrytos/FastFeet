"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAddress = void 0;
const entity_1 = require("../../../../core/entities/entity");
class DeliveryAddress extends entity_1.Entity {
    get state() {
        return this.props.state;
    }
    set state(state) {
        this.props.state = state;
    }
    get city() {
        return this.props.city;
    }
    set city(city) {
        this.props.city = city;
    }
    get neighborhood() {
        return this.props.neighborhood;
    }
    set neighborhood(neighborhood) {
        this.props.neighborhood = neighborhood;
    }
    get street() {
        return this.props.street;
    }
    set street(street) {
        this.props.street = street;
    }
    get zip() {
        return this.props.zip;
    }
    set zip(zip) {
        this.props.zip = zip;
    }
    get number() {
        return this.props.number;
    }
    set number(number) {
        this.props.number = number;
    }
    get latitude() {
        return this.props.latitude;
    }
    set latitude(latitude) {
        this.props.latitude = latitude;
    }
    get longitude() {
        return this.props.longitude;
    }
    set longitude(longitude) {
        this.props.longitude = longitude;
    }
    static create(props, id) {
        const deliveryAddress = new DeliveryAddress(props, id);
        return deliveryAddress;
    }
}
exports.DeliveryAddress = DeliveryAddress;
//# sourceMappingURL=delivery-address.js.map