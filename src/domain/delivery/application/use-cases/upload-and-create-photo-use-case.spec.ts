import { InMemoryPhotosRepository } from "@/test/repositories/in-memory-photos-repository";
import { UploadAndCreatePhotoUseCase } from "./upload-and-create-photo-use-case";
import { FakeUploader } from "@/test/storage/fake-uploader";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

describe("upload and create photo use case", () => {
  let sut: UploadAndCreatePhotoUseCase;
  let fakeUploader: FakeUploader;
  let inMemoryPhotosRepository: InMemoryPhotosRepository;

  beforeEach(() => {
    fakeUploader = new FakeUploader();
    inMemoryPhotosRepository = new InMemoryPhotosRepository();

    sut = new UploadAndCreatePhotoUseCase(
      fakeUploader,
      inMemoryPhotosRepository
    );
  });

  it("should upload and create a photo", async () => {
    const result = await sut.execute({
      fileName: "my-photo.jpg",
      fileType: "image/jpg",
      photo: Buffer.from("photo"),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryPhotosRepository.items.length).toEqual(1);
    expect(inMemoryPhotosRepository.items[0]).toMatchObject({
      props: {
        fileName: "my-photo.jpg",
        url: "my-photo.jpg",
      },
    });
  });

  it("should not be possible to upload a file other", async () => {
    const result = await sut.execute({
      fileName: "my-photo.jpg",
      fileType: "image/pdf",
      photo: Buffer.from("photo"),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryPhotosRepository.items.length).toEqual(0);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
