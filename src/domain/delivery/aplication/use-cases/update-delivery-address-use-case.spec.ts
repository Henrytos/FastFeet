import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository"
import { UpdateDeliveryAddressUseCase } from "./update-delivery-address-use-case"
import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository"

describe("update delivery address use case",()=>{
  let sut:UpdateDeliveryAddressUseCase
  let inMemoryAdministratorsRepository:InMemoryAdministratorsRepository
  let inMemoryDeliveryAddressRepository:InMemoryDeliveryAddressRepository

  beforeEach(()=>{
    inMemoryAdministratorsRepository= new InMemoryAdministratorsRepository()
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    sut = new UpdateDeliveryAddressUseCase(
        inMemoryAdministratorsRepository,
        inMemoryDeliveryAddressRepository
    )
  })

  it("should be possible to update address", async()=>{

  })

  it("shouldn't be possible to update an address if it doesn't exist", async()=>{
    
  })

  it("should not be possible to update the address if you are not an administrator", async()=>{
    
  })

})