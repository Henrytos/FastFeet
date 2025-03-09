import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { UploadPhotoForStorageUseCase } from '@/domain/delivery/application/use-cases/upload-and-create-photo-use-case'
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

@Controller('/upload')
@ApiTags('photo')
@ApiBearerAuth()
export class UploadPhotoForStorageController {
  constructor(
    private readonly uploadPhotoForStorageUseCase: UploadPhotoForStorageUseCase,
  ) {}

  @Post('/photo')
  @UseRolesGuards('DELIVERY_MAN')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        photoUrl: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async handler(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadPhotoForStorageUseCase.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      photo: file.buffer,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case WrongCredentialsError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      photoUrl: result.value.url,
    }
  }
}
