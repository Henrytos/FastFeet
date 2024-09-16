import { Either, left, right } from "@/core/either";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryAddress } from "../../enterprise/entites/delivery-address";

interface UpdateDeliveryAddressUseCaseRequest {
  adminitratorId: string;
  deliveryAddresId: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  zip: string;
  number: string;
  latitude: number;
  longitude: number;
}

type UpdateDeliveryAddressUseCaseResponse = Either<
    DeliveryAddressDoesNotExistError | 
    AdministratorDoesNotExistError, 
    {
    
    }
  >;

export class UpdateDeliveryAddressUseCase {
  constructor(
    private adminitratorsRepository:AdministratorsRepository ,
    private deliveryAddressRepository:DeliveryAddressRepository
  ){}

  async execute({
    adminitratorId,
    deliveryAddresId ,
    state ,
    city ,
    neighborhood ,
    street ,
    zip ,
    number ,
    latitude ,
    longitude ,
  }: UpdateDeliveryAddressUseCaseRequest): Promise<UpdateDeliveryAddressUseCaseResponse> {

    const adminitrator = await this.adminitratorsRepository.findById(adminitratorId)
    if(!adminitrator){
      return left(new AdministratorDoesNotExistError())
    }


    const deliveryAddress = await this.deliveryAddressRepository.findById(deliveryAddresId)
    if(!deliveryAddress){
      return left(new DeliveryAddressDoesNotExistError())
    }

    const deliveryAddressUpdated = DeliveryAddress.create({
      state ,
      city ,
      neighborhood ,
      street ,
      zip ,
      number ,
      latitude ,
      longitude ,
    },deliveryAddress.id)

    this.deliveryAddressRepository.save(deliveryAddressUpdated)
    

    return right({});
  }
}
