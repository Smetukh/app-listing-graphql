import { gql } from 'apollo-boost';

export const appsQuery = gql`
  query appsQuery($name: String) {
    apps(name: $name) {
      id
      name
    }
  }
`;
