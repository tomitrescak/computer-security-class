import * as React from 'react';
import { config } from 'semanticui-react';
import { Link } from 'react-router';

// const jquery = require('jquery');
// global.$ = jquery;
// global.jQuery = jquery;

export default function () {
  config.linkElement = (props: any) => {
    let newProps = Object.assign({}, props, { to: props.href });
    return React.createElement(Link, newProps);
  };
}
