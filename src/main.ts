import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from '@app/exception-handler';
dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(new HttpAdapterHost()));
  await app.listen(Number(process.env.PORT));
}
bootstrap();
