

describe("sa"){
    it("should return a list of delivery    mans", async () => {
        // Arrange
        const deliveryMansRepository = new InMemoryDeliveryMansRepository();
        const fetchDeliveryMansUseCase = new FetchDeliveryMansUseCase(deliveryMansRepository);
        const deliveryMan = DeliveryMan.create({
            name: "John Doe",
            cpf: Cpf.create("123.456.789-00").value as Cpf,
            email: "

            // Act
        }
    })



}