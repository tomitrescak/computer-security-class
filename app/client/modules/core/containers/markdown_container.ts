import { connect } from 'apollo-mantra';
import Component, { IComponentProps } from '../components/markdown_view';

interface IProps {
  context?: () => Cs.IContext;
  text: string;
}

const mapStateToProps = (context: Cs.IContext, state: Cs.IState, ownProps: IProps): IComponentProps => ({
  html: context.Utils.Ui.parseMarkdown(ownProps.text)
});

export default connect<IProps>({ mapStateToProps })(Component);