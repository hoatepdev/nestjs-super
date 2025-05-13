import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionalGuard } from 'src/shared/constants/auth.constant'
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { CreatePostBodyDTO, DeletePostBodyDTO, GetPostItemDTO, UpdatePostBodyDTO } from './post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  @Auth([AuthType.Bearer, AuthType.APIKey], { conditional: ConditionalGuard.And })
  // @UseGuards(AuthenticationGuard)
  async getPosts(@ActiveUser('userId') userId: number) {
    return this.postsService.getPosts(userId).then((posts) => {
      return posts.map((post) => new GetPostItemDTO(post))
    })
  }

  @Post()
  @Auth([AuthType.Bearer])
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new CreatePostBodyDTO(await this.postsService.createPost(userId, body))
  }

  @Get(':id')
  @Auth([AuthType.Bearer])
  async getPost(@Param('id') id: string) {
    return new CreatePostBodyDTO(await this.postsService.getPost(Number(id)))
  }

  @Put(':id')
  @Auth([AuthType.Bearer])
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new UpdatePostBodyDTO(await this.postsService.updatePost({ postId: Number(id), userId, body }))
  }

  @Delete(':id')
  @Auth([AuthType.Bearer])
  async deletePost(@Param('id') id: string, @ActiveUser('userId') userId: number) {
    return new DeletePostBodyDTO(await this.postsService.deletePost({ postId: Number(id), userId }))
  }
}
