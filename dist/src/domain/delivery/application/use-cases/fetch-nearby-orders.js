"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchNearbyOrdersWithDistanceUseCase = void 0;
const either_1 = require("../../../../core/either");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
class FetchNearbyOrdersWithDistanceUseCase {
    constructor(deliveryMansRepository, ordersRepository) {
        this.deliveryMansRepository = deliveryMansRepository;
        this.ordersRepository = ordersRepository;
    }
    async execute({ from, page, deliveryManId, }) {
        const deliveryMan = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryMan) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        const ordersNearbyWithDistance = await this.ordersRepository.fetchManyNearbyWithDistance({
            longitude: from.deliveryManLongitude,
            latitude: from.deliveryManLatitude,
        }, page);
        return (0, either_1.right)({
            ordersWithDistance: ordersNearbyWithDistance,
        });
    }
}
exports.FetchNearbyOrdersWithDistanceUseCase = FetchNearbyOrdersWithDistanceUseCase;
//# sourceMappingURL=fetch-nearby-orders.js.map