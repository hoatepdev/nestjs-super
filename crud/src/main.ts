import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields
      forbidNonWhitelisted: true, // throw an error if extra fields are provided
      transform: true, // transform the data to the correct type
      transformOptions: {
        enableImplicitConversion: true, // convert the data to the correct type
      },
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(
          errors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints ?? {}).join(', '),
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
