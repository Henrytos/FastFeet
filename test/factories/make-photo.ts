import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Photo, PhotoProps } from "@/domain/delivery/enterprise/entites/photo";
import { faker } from "@faker-js/faker";

export function makePhoto(
  overwide: Partial<PhotoProps> = {},
  id?: UniqueEntityID
): Photo {
  const photo = Photo.create(
    {
      fileName: faker.lorem.text(),
      url: faker.internet.url(),
      ...overwide,
    },
    id
  );

  return photo;
}
