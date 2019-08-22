import { gql } from 'apollo-boost';

export const androidsQuery = gql`
  query androidsQuery($name: String) {
    androids(name: $name) {
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
