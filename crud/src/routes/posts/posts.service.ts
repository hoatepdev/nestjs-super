/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common'
import { Post } from './posts.controller'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany({})
  }

  createPost(body: Post) {
    console.log('⭐ body', body)

    const userId = 1
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    })
  }

  getPost(id: string) {
    return `Post ${id}`
  }

  updatePost(id: string, body: any) {
    return `Post ${id} updated: ${JSON.stringify(body)}`
  }

  deletePost(id: string) {
    return `Post ${id} deleted`
  }
}
