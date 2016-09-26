import { connect } from 'apollo-mantra';
import { graphql } from 'react-apollo';
import Component, { IContainerProps } from '../components/marks_view';

const withMarks = graphql(gql`query marks($semesterId: String) {
    marks(semesterId: $semesterId)
  }
`, {
    options: (ownProps: IContainerProps) => ({
      variables: {
        semesterId: ownProps.params.semesterId
      },
    }),
    props: ({ data }: any) => {
      return {
        marks: data.marks
      };
    }
  }
);

export default withMarks(Component);