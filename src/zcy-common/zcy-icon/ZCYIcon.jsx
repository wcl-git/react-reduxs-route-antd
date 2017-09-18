import React from 'react';

export default props => {
  let { type, className = '', hasIcon, ...other } = props;
  hasIcon ? className += ` zcyicon zcy${type}` : className += ` zcyicon zcyicon-${type}`;
  return <i className={className.trim()} {...other} />;
};
