import { Module } from '@nestjs/common';
import { config } from './shared/config/config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './core/users/users.module';
import { PrismaService } from './shared/database/prisma.service';
import { AuthModule } from './core/authentication/auth.module';
import { ProductModule } from './core/product/product.module';
import { AuthorizationModule } from './core/authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    AuthorizationModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  //
}
