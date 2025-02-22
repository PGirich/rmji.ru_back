import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipes/validation.pipe'

async function start() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)
  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('rmji.ru API')
    .setDescription('rmji.ru backend API')
    .setVersion('1.0')
    .addTag('rmji')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  // global
  app.useGlobalPipes(new ValidationPipe())

  // start
  await app.listen(PORT, () => {
    console.log(`Server started on port  ${PORT}`)
  })
}

start()
