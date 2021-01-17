import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import FlashMessage from './components/FlashMessage';
import { createTask, editTask, deleteTask, fetchTasks } from './actions';
import 'antd/dist/antd.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description, }));
  };

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  onDeleteTask = (id) => {
    this.props.dispatch(deleteTask(id));
  };

  render() {
    return (
      <div>
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div>
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);