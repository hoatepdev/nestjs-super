import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreatePostBodyDTO, UpdatePostBodyDTO } from './post.dto'
import { isNotFoundPrismaError } from 'src/shared/helpers'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          omit: { password: true },
        },
      },
    })
  }

  createPost(userId: number, body: CreatePostBodyDTO) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
      include: {
        author: {
          omit: { password: true },
        },
      },
    })
  }

  async getPost(postId: number) {
    try {
      const postFound = await this.prismaService.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
        include: {
          author: {
            omit: { password: true },
          },
        },
      })
      return postFound
    } catch (error) {
      if (isNotFoundPrismaError(error)) throw new NotFoundException('Post not found')
      throw error
    }
  }

  async updatePost({ postId, userId, body }: { postId: number; userId: number; body: UpdatePostBodyDTO }) {
    try {
      const postUpdated = await this.prismaService.post.update({
        where: { id: postId, authorId: userId },
        data: body,
        include: {
          author: {
            omit: { password: true },
          },
        },
      })
      return postUpdated
    } catch (error) {
      if (isNotFoundPrismaError(error)) throw new NotFoundException('Post not found')
      throw error
    }
  }

  async deletePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      const postDeleted = await this.prismaService.post.delete({
        where: { id: postId, authorId: userId },
        include: {
          author: {
            omit: { password: true },
          },
        },
      })
      return postDeleted
    } catch (error) {
      if (isNotFoundPrismaError(error)) throw new NotFoundException('Post not found')
      throw error
    }
  }
}
