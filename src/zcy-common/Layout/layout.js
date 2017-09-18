import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

function generator(props) {
  return (Basic) => {
    return class Adapter extends React.Component {
      static propTypes = {
        style: PropTypes.object,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
      }

      render() {
        const { prefixCls } = props;
        return <Basic prefixCls={prefixCls} {...this.props}/>;
      }
    };
  };
}

class Basic extends React.Component {
  render() {
    const { prefixCls, className, children, ...others } = this.props;
    let hasSider;
    React.Children.forEach(children, (element: any) => {
      if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
        hasSider = true;
      }
    });
    const divCls = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider,
    });
    return (
      <div className={divCls} {...others}>{children}</div>
    );
  }
}

const Layout = generator({
  prefixCls: 'ant-layout',
})(Basic);

const Header = generator({
  prefixCls: 'ant-layout-header',
})(Basic);

const Footer = generator({
  prefixCls: 'ant-layout-footer',
})(Basic);

const Content = generator({
  prefixCls: 'ant-layout-content',
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
