import { Module } from '@nestjs/common';
import { config } from './shared/config/config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './core/users/users.module';
import { PrismaService } from './shared/database/prisma.service';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  //
}
