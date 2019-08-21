import { gql } from 'apollo-boost';

export const appsQuery = gql`
  query appsQuery($name: String) {
    apps(name: $name) {
      id
      build
      bundleId
      dateExpired
      dateModified
      fileLink
      fileName
      fileSize
      iconLink
      installLink
      qrCode
      team
      timestamp
      version
    }
  }
`;
