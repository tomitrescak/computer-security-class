import { ioSchema } from 'apollo-modules';

const schema = `
  ${ioSchema(`Profile$Input {
    name: String
  }`)}
  `;

export default {
  schema
}