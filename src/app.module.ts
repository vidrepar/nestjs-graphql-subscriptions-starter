import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TicketResolver } from './ticket.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [TicketResolver],
})
export class AppModule {}
