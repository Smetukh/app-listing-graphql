import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { appsQuery } from './queries';

import { styles } from './styles';

const withGraphQL = graphql(appsQuery, {
  options: ({ name = '', fileSize = 0 }) => ({
    variables: { name,
      fileSize },
  }),
});

export default compose(withStyles(styles), withGraphQL);
