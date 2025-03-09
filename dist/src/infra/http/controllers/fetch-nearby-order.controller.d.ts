import { FetchNearbyOrdersWithDistanceUseCase } from '@/domain/delivery/application/use-cases/fetch-nearby-orders';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const queryFetchOrderNearbySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
}, {
    page?: number;
}>;
type QueryFetchOrderNearby = z.infer<typeof queryFetchOrderNearbySchema>;
declare const bodyFetchOrderNearbySchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    latitude?: number;
    longitude?: number;
}, {
    latitude?: number;
    longitude?: number;
}>;
type BodyFetchOrderNearby = z.infer<typeof bodyFetchOrderNearbySchema>;
export declare class FetchOrderNearbyController {
    private readonly fetchNearbyOrdersWithDistanceUseCase;
    constructor(fetchNearbyOrdersWithDistanceUseCase: FetchNearbyOrdersWithDistanceUseCase);
    handler({ page }: QueryFetchOrderNearby, { latitude, longitude }: BodyFetchOrderNearby, deliveryMan: UserPayload): Promise<{
        orders: {
            id: string;
            deliveryManId: string;
            recipientId: string;
            deliveryAddressId: string;
            photoId: string;
            status: import("../../../core/constants/order-status.enum").ORDER_STATUS;
            deliveryAt: Date;
            withdrawnAt: Date;
            updatedAt: Date;
            createdAt: Date;
            distanceInKms: number;
        }[];
    }>;
}
export {};
