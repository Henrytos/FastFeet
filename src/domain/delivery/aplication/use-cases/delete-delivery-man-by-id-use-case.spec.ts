import { InMemoryDeliveryMansRepository } from "@/test/repositories/in-memory-delivery-mans-repository";
import { DeleteDeliveryManByIdUseCase } from "./delete-delivery-man-by-id-use-case";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryMan } from "@/test/factories/make-delivery-man";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";

describe("create deleviry man  use case", () => {
  let sut: DeleteDeliveryManByIdUseCase;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();

    sut = new DeleteDeliveryManByIdUseCase(inMemoryDeliveryMansRepository);
  });

  it("should be possible to delete a delivery by administrator", async () => {
    const administrator = makeAdministrator();

    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });

    inMemoryDeliveryMansRepository.items.push(deliveryMan);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(0);
  });

  it("should not be possible to delete a delivery man who does not exist", async () => {
    const administrator = makeAdministrator();

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: "invalid-delivery-man-id",
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });

  it("should not be possible to delete a delivery man if he is not an administrator", async () => {
    const administrator = makeAdministrator();
    const administrator2 = makeAdministrator();

    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });

    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      administratorId: administrator2.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
