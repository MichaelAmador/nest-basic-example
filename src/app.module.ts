import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'MyP0stGr3sP4ss',
      database: 'todo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PrismaModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
