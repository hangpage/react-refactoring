import React from 'react'

// connectRoute.js
/*
*   重新封装route，防止route内部进行状态计算，引起container component不必要的渲染
*
*e
* */
export default function connectRoute(WrappedComponent) {
  return class extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.location !== this.props.location;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
