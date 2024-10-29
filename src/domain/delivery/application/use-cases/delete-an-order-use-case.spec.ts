import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { DeleteAnOrderUseCase } from "./delete-an-order-use-case";
import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { makeOrder } from "@/test/factories/make-order";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";

describe("delete an order use case", () => {
  let sut: DeleteAnOrderUseCase;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    );
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();

    sut = new DeleteAnOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryAdministratorsRepository,
    );
  });

  it("should be possible to delete an order", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder();
    inMemoryOrdersRepository.items.push(order);

    expect(inMemoryOrdersRepository.items.length).toEqual(1);

    const result = await sut.execute({
      orderId: order.id.toString(),
      administratorId: administrator.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryOrdersRepository.items.length).toEqual(0);
  });

  it("should not be possible to delete an order that does not exist", async () => {
    const order = makeOrder();
    inMemoryOrdersRepository.items.push(order);
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      orderId: "invalid-order-id",
      administratorId: administrator.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError);
    expect(inMemoryOrdersRepository.items.length).toEqual(1);
  });

  it("should not be possible to delete an order if I am not an administration", async () => {
    const order = makeOrder();
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
      administratorId: "invalid-administrator-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
    expect(inMemoryOrdersRepository.items.length).toEqual(1);
  });
});
