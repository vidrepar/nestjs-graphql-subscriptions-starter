import { Field, ID, ObjectType } from 'type-graphql';
import { Query, Mutation, Resolver, Subscription, Args } from '@nestjs/graphql';
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

  // payload seems to be what you send on publish pubSub.publish(... usually in mutation
  // variables seem to be the filter/variables/args you provide when opening a subscription
  @Subscription(returns => Ticket, {
    filter(this: TicketResolver, payload, variables, foo) {
      // "this" refers to an instance of "AuthorResolver"
      // return payload.commentAdded.repositoryName === variables.repoFullName;

      console.log('payload');
      console.log(payload);

      console.log('variables');
      console.log(variables);

      console.log('foo'); // foo is metadata
      console.log(foo);

      return true;
    },
  })
  pong(
    @Args({ name: 'repoFullName', type: () => String }) repoFullName: string,
  ) {
    return pubSub.asyncIterator(PONG_EVENT_NAME);
  }
}
