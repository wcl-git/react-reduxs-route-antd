import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Row,Col} from 'zcy-antd';
import { FIELD_META_PROP } from './constants';
import './index.less'
import AuditPopover from '../../audit-popover/containers'
import moment from  'moment'

export default class FormItem extends React.Component {
  static defaultProps = {
    hasFeedback: false,
    prefixCls: 'ant-form',
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    label: React.PropTypes.node,
    labelCol: React.PropTypes.object,
    help: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
    validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: React.PropTypes.bool,
    wrapperCol: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    children: React.PropTypes.node,
  }

  static contextTypes = {
    form: React.PropTypes.object,
    editEnable:React.PropTypes.bool,
    auditEnable: React.PropTypes.bool
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getHelpMsg() {
    const context = this.context;
    const props = this.props;
    if (props.help === undefined && context.form) {
      const ids = this.getIds();
      var msg = '';
      ids.map((id)=>{
        if(!msg){
          msg = (context.form.getFieldError(id) || []).join(',');
        }
      });
      return msg
    }
    return props.help;
  }

  getOnlyControl() {
    const children = React.Children.toArray(this.props.children);
    const child = children.filter((c) => {
      return c.props && FIELD_META_PROP in c.props;
    })[0];
    return child !== undefined ? child : null;
  }

  getOnlyControls() {
    const children = React.Children.toArray(this.props.children);
    const child = children.filter((c) => {
      return c.props && FIELD_META_PROP in c.props;
    });
    return child !== undefined ? child : null;
  }


  getChildProp(prop) {
    const child = this.getOnlyControl();
    return child && child.props && child.props[prop];
  }

  getId() {
    return this.getChildProp('id');
  }

  getIds() {
    const childs = this.getOnlyControls();
    return childs.map((child)=>{
      return child && child.props && child.props['id'];
    })
    
  }

  getMeta() {
    return this.getChildProp(FIELD_META_PROP);
  }

  getText(type = "", value,children) {
    let _value ='';
    const auditEnable = this.context.auditEnable;
    const editEnable = this.context.editEnable;
    let auditClasses = classNames({
      'is-audit': !editEnable && auditEnable
    })
    if (type === "") {
      _value = value;
    }

    if (type === 'address' && value) {
          let street=this.props.children[1].props.value?'/'+this.props.children[1].props.value:'';
          _value = value+street;
    }
    
    if(type === 'date'){
      _value = value ? moment(value).format("YYYY-MM-DD") : '';
    }

    if(type === 'tree'){
      _value = value ? value.label : '';
    }

    if (type === 'range') {
      _value = React.Children.map(children, (child, index) => {
        if (typeof child.type !== 'string') {
          return child.props.value ? moment(child.props.value).format("YYYY-MM-DD") : '';
        }
        return child
      })
    }

    if(type === 'upload' && children){
      _value = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          showOnly: true,
          ref: +new Date() + index
        })
      })
    }

    if(type==='pureText'){
       _value = children
    }

    return (
      <div className={`${this.props.prefixCls}-item-control ${auditClasses}`}>
        {
          auditEnable 
          ? <AuditPopover text={_value} name={children[0].props.id} />
          : _value
        }
      </div>
    );

  }


  renderHelp() {
    const prefixCls = this.props.prefixCls;
    const help = this.getHelpMsg();
    return help ? (
      <div className={`${prefixCls}-explain`} key="help">
        {help}
      </div>
    ) : null;
  }

  renderExtra() {
    const { prefixCls, extra } = this.props;
    return extra ? (
      <span className={`${prefixCls}-extra`}>{extra}</span>
    ) : null;
  }

  getValidateStatus(fields=[]) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.context.form;
    let defaultStatus = ''
    if (fields.length===0) {
      return '';
    }
    // fields.map((field, index) => {
    //   if (isFieldValidating(field)) {
    //     return 'validating';
    //   }
    //  if (!!getFieldError(field)) {
    //     defaultStatus = 'error';
    //   } 
    //   if (getFieldValue(field) !== undefined) {
    //     return 'success';
    //   }
    // })
    for (let i = 0, len = fields.length; i < len; i++) {
      let field = fields[i]
      if (isFieldValidating(field)) {
        defaultStatus = 'validating';
      }
      if (!!getFieldError(field)) {
        defaultStatus = 'error';
        break;
      } 
      if (getFieldValue(field) !== undefined) {
        defaultStatus = 'success';
      }
    }
    
    return defaultStatus ? defaultStatus : '';
  }

  renderValidateWrapper(c1, c2, c3) {
    let classes = '';
    const form = this.context.form;
    
    const props = this.props;
    const validateStatus = (props.validateStatus === undefined && form) ?
      this.getValidateStatus(this.getIds()) :
      props.validateStatus;

    if (validateStatus) {
      classes = classNames(
        {
          'has-feedback': props.hasFeedback,
          'has-success': validateStatus === 'success',
          'has-warning': validateStatus === 'warning',
          'has-error': validateStatus === 'error',
          'is-validating': validateStatus === 'validating',
        }
      );
    }
    
    return (
      <div className={`${this.props.prefixCls}-item-control ${classes}`}>
        {c1}{c2}{c3}
      </div>
    );
  }

  renderWrapper(children) {
    const wrapperCol = this.props.wrapperCol?this.props.wrapperCol:{span: 19};
    return (
      <Col {...wrapperCol} key="wrapper">
        {children}
      </Col>
    );
  }

  isRequired() {
    if (this.context.form) {
      const meta = this.getMeta() || {};
      const validate = (meta.validate || []);

      return validate.filter((item) => !!item.rules).some((item) => {
        return item.rules.some((rule) => rule.required);
      });
    }
    return false;
  }

  renderLabel() {
    const props = this.props;
    const labelCol = props.labelCol?props.labelCol:{span: 5};
    const required = props.required === undefined ?
      this.isRequired() :
      props.required;

    const className = classNames({
      [`${props.prefixCls}-item-required`]: required,
    });

    // remove user input colon
    let label = props.label;
    if (typeof label === 'string' && label.trim() !== '') {
      label = props.label.replace(/[：|:]\s*$/, '');
    }

    return props.label ? (
      <Col {...labelCol} key="label" className={`${props.prefixCls}-item-label`}>
        <label htmlFor={props.id || this.getId()} className={className}>
          {label}
        </label>
      </Col>
    ) : null;
  }

  renderChildren() {
    const props = this.props;
    const children = React.Children.map(props.children, (child) => {
      if (child && typeof child.type === 'function' && !child.props.size) {
        return React.cloneElement(child, { size: 'large' });
      }
      return child;
    });
    let value = this.getChildProp('value');
    let text = this.getChildProp('text');
    value = text?text:value;
    const type = props.type;
    const editEnable = this.context.editEnable;
    const textComponent = editEnable?this.renderValidateWrapper(
        children,
        this.renderHelp(),
        this.renderExtra()
      ): this.getText(type,value,children)
    return [
      this.renderLabel(),
      this.renderWrapper(
        textComponent
      ),
    ];
  }

  renderFormItem(children) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const style = props.style;
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: !!this.getHelpMsg(),
      [`${props.className}`]: !!props.className,
    };

    return (
      <Row className={classNames(itemClassName,'zcy-form-item')} style={style}>
        {children}
      </Row>
    );
  }

  render() {
    const children = this.renderChildren();
    return this.renderFormItem(children);
  }
}
