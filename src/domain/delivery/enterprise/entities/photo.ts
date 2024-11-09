import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PhotoProps {
  url: string
  fileName: string
}

export class Photo extends Entity<PhotoProps> {
  get url() {
    return this.props.url
  }

  set url(url: string) {
    this.props.url = url
  }

  get fileName() {
    return this.props.fileName
  }

  set fileName(fileName: string) {
    this.props.fileName = fileName
  }

  static create(props: PhotoProps, id?: UniqueEntityID): Photo {
    const photo = new Photo(
      {
        ...props,
      },
      id,
    )

    return photo
  }
}
