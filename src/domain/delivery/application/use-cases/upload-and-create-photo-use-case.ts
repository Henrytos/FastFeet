import { Either, left, right } from '@/core/either'
import { Uploader } from '../storage/uploader'
import { Photo } from '../../enterprise/entities/photo'
import { PhotosRepository } from '../repositories/photos-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Injectable } from '@nestjs/common'

interface UploadPhotoForStorageUseCaseRequest {
  photo: Buffer
  fileName: string
  fileType: string
}

type UploadPhotoForStorageUseCaseResponse = Either<
  WrongCredentialsError,
  {
    url: string
  }
>

@Injectable()
export class UploadPhotoForStorageUseCase {
  constructor(
    private readonly uploader: Uploader,
    private readonly photosRepository: PhotosRepository,
  ) {}

  async execute({
    photo,
    fileName,
    fileType,
  }: UploadPhotoForStorageUseCaseRequest): Promise<UploadPhotoForStorageUseCaseResponse> {
    if (!/^image\/(jpg|jpeg|png)$/.test(fileType)) {
      return left(new WrongCredentialsError())
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body: photo,
    })

    const newPhoto = Photo.create({ url, fileName })

    await this.photosRepository.create(newPhoto)

    return right({ url })
  }
}
