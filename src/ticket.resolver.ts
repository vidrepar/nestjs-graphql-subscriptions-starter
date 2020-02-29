import { Field, ID, ObjectType } from 'type-graphql';
import { Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

@ObjectType()
export class Ticket {
  @Field(type => ID)
  id: string;
}

const pubSub = new PubSub();
const PONG_EVENT_NAME = 'pong';

@Resolver(of => Ticket)
export class TicketResolver {
  @Query(returns => Ticket)
  async ticket() {
    return 'foo';
  }

  @Mutation(returns => Ticket)
  async upvotePost() {
    const pingId = Date.now() + 'foo';
    pubSub.publish(PONG_EVENT_NAME, { [PONG_EVENT_NAME]: { id: pingId } });
    return { id: pingId + 'bar' };
  }

  @Subscription(returns => Ticket)
  pong() {
    return pubSub.asyncIterator(PONG_EVENT_NAME);
  }
}
