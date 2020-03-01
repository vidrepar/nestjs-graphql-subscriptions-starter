import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TicketResolver } from './ticket.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        onConnect: (connectionParams, webSocket, context) => { // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#lifecycle-events
          // TODO: Validate token
          // TODO: But is the token still valid if it is not validated for every message?
          // Reference: https://www.apollographql.com/docs/apollo-server/data/subscriptions/

          console.log('CONNECTION_PARAMS');
          console.log(connectionParams);

          console.log('WEB_SOCKET');
          console.log(webSocket);

          console.log('CONTEXT');
          console.log(context);
        },
      },
    }),
  ],
  providers: [TicketResolver],
})
export class AppModule {}
