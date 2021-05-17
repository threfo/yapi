import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddInterfaceForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    onGroupChange: PropTypes.func,
    onProjectChange: PropTypes.func,
    onCancel: PropTypes.func,
    catdata: PropTypes.object
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  handleGroupChange = value => {
    const { setFieldsValue } =  this.props.form;
    setFieldsValue({'project_id': ''});
    setFieldsValue({'catid': ''});
    this.props.onGroupChange(value);
  }

  handleProjectChange = value => {
    const { setFieldsValue } =  this.props.form;
    setFieldsValue({'catid': ''});
    this.props.onProjectChange(value);
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="分组">
          {getFieldDecorator('group_id', {
            rules: [
              {
                required: true,
                message: '请选择分组!'
              }
            ],
            initialValue: ''
          })(
            <Select onSelect={this.handleGroupChange}>
              {this.props.catdata.groupList.map(item => {
                return <Option key={item._id} value={item._id + ""}>{item.group_name}</Option>
              })}
            </Select>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="项目">
          {getFieldDecorator('project_id', {
            rules: [
              {
                required: true,
                message: '请选择项目!'
              }
            ],
            initialValue: ''
          })(
            <Select onChange={this.handleProjectChange}>
              {this.props.catdata.projectList.map(item => {
                return <Option key={item._id} value={item._id + ""}>{item.name}</Option>
              })}
            </Select>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="分类">
          {getFieldDecorator('catid', {
            rules: [
              {
                required: true,
                message: '请选择分类!'
              }
            ],
            initialValue: ''
          })(
            <Select>
              {this.props.catdata.catList.map(item => {
                return <Option key={item._id} value={item._id + ""}>{item.name}</Option>
              })}
            </Select>
            )}
        </FormItem>
        <FormItem className="catModalfoot" wrapperCol={{ span: 24, offset: 8 }}>
          <Button onClick={this.props.onCancel} style={{ marginRight: '10px' }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddInterfaceForm);
