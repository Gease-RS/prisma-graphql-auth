import { Arg, Ctx, Field, InputType, Query, Resolver } from "type-graphql";
import { Context } from './context'
import { User } from './User'

@InputType()
class UserInputData{
    @Field()
    email: string

    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Query((returns) => User, { nullable: true})
    async privateInfo(
        @Arg("token") token: string,
        @Ctx() ctx: Context
    ): Promise<User | null> {
        const dbToken = await ctx.prisma.tokens.findUnique({
            where: { token },
            include: { user: true }
        })
        if(!dbToken) return null

        const { user } = dbToken

        return user
    }
}