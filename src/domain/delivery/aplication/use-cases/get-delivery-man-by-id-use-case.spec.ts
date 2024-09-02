import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryMan } from "@/test/factories/make-delivery-man";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { GetDeliveryManByIdUseCase } from "./get-delivery-man-by-id-use-case";
import { InMemoryDeliveryMansRepository } from "@/test/repositories/in-memory-delivery-mans-repository";

describe("get deleviry man  use case", () => {
  let sut: GetDeliveryManByIdUseCase;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();

    sut = new GetDeliveryManByIdUseCase(inMemoryDeliveryMansRepository);
  });

  it("should be possible to get a delivery by administrator", async () => {
    const administrator = makeAdministrator();

    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });

    inMemoryDeliveryMansRepository.items.push(deliveryMan);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deleviryManId: deliveryMan.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      deliveryMan: deliveryMan,
    });
  });

  it("should not be possible to get a delivery man who does not exist", async () => {
    const administrator = makeAdministrator();

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deleviryManId: "invalid-delivery-man-id",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });

  it("should not be possible to get a delivery man if he is not an administrator", async () => {
    const administrator = makeAdministrator();
    const administrator2 = makeAdministrator();

    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });

    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      administratorId: administrator2.id.toString(),
      deleviryManId: deliveryMan.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
