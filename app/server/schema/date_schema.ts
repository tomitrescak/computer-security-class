import { ApolloModule } from 'apollo-modules';

const schema = `
  scalar Date
`;

const resolvers = {
  Date: {
    __parseValue (value: number) {
      return new Date(value);
    },
    __parseLiteral (ast: any) {
      return (parseInt(ast.value, 10));
    },
    __serialize(value: Date) {
      return value.getTime();
    }
  }
};

const def: ApolloModule = {
  schema,
  resolvers
};

export default def;
