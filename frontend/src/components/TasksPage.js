import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import TaskList from "./TaskList";
import { TASK_STATUSES } from '../constants';

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
    };
  }

  toggleForm = () => {
    this.setState({ showNewCardForm: !this.state.showNewCardForm });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <div>
          <Button type="primary" onClick={this.toggleForm}>タスク追加</Button>
        </div>
        {this.state.showNewCardForm && <WrappedAddTaskForm onCreateTask={this.props.onCreateTask} />}
        <div>
          {TASK_STATUSES.map(status => {
            const statusTasks = this.props.tasks.filter(
              task => task.status === status
            );
            return (
              <div style={{ margin: "25px 20px 25px 20px" }}>
                <h2>{status}</h2>
                <TaskList
                  key={status}
                  status={status}
                  tasks={statusTasks}
                  onStatusChange={this.props.onStatusChange}
                  onDeleteTask={this.props.onDeleteTask}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TasksPage;

class AddTaskForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.onCreateTask(values)
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    const taskError = isFieldTouched('task') && getFieldError('task');
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    const buttonDisable = getFieldError('task') || getFieldError('description')

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={taskError ? 'error' : ''} help={taskError || ''}>
          {getFieldDecorator('task', {
            rules: [{ required: true, message: 'taskを入力してください' }],
          })(
            <Input
              prefix={<UserOutlined />}
              placeholder="task"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'descriptionを入力してください' }],
          })(
            <Input
              prefix={<EditOutlined />}
              placeholder="description"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={buttonDisable}>
            タスク追加
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


const WrappedAddTaskForm = Form.create({ name: 'add_task_form' })(AddTaskForm);