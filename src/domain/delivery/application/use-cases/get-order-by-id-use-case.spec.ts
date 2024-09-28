import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { GetOrderByIdUseCase } from "./get-order-by-id-use-case";
import { makeOrder } from "@/test/factories/make-order";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";

describe("get order by id use case", () => {
  let sut: GetOrderByIdUseCase;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();

    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository
    );
    sut = new GetOrderByIdUseCase(inMemoryOrdersRepository);
  });

  it("should return an order by the id", async () => {
    const order = makeOrder();
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(result.value).toMatchObject({ order });
  });

  it("should not return an envomenda if it does not exist", async () => {
    const result = await sut.execute({
      orderId: "invalid-order-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError);
  });
});
