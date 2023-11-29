import { NestFactory } from '@nestjs/core'
import { CoreModule } from './core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function init() {
    const PORT = process.env.PORT || 5000;

    // const app = await NestFactory.createMicroservice<NestMicroserviceOptions>(CoreModule, {
    //   transport: Transport.REDIS,
    //   options: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // });
    
    const app = await NestFactory.create(CoreModule)
    app.setGlobalPrefix('v1/api');


    const config = new DocumentBuilder()
    .setTitle('The Test')
    .setDescription('Test implementation')
    .setVersion('1.0')
    .addTag('test')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT)
}

init();

// TypeORM jointable(belongs relation) leftjoin && check queryBuilder && SQL 



/*
import { Injectable, Inject } from '@nestjs/common';

@Injectable() // composition
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}


import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {   // inheritance
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
*/
