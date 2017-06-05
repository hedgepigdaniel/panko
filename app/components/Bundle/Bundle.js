import { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * React bundle
 * @type {ReactElement}
 */
export default class Bundle extends PureComponent {

  static propTypes = {
    loader: PropTypes.func.isRequired,
    children: PropTypes.func,
  }

  static defaultProps = {
    children: undefined,
  }

  static contextTypes = {
    loadStart: PropTypes.func,
    loadEnd: PropTypes.func,
  }

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loader !== this.props.loader) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.context.loadStart();
    this.setState({
      mod: null,
    });
    props.loader().then((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default,
      });
      this.context.loadEnd();
      this.render();
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : false;
  }
}
