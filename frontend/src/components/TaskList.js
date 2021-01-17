import React from 'react';
import { List, Card, Button } from 'antd';
import { TASK_STATUSES } from '../constants';


const TaskList = props => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={props.tasks}
      renderItem={item => (
        <List.Item>
          <Card title={item.title}>{item.description}</Card>
          <select valur={item.status} onChange={(e) => { onStatusChange(e, item.id) }}>
            {TASK_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <Button type="danger" onClick={() => { props.onDeleteTask(item.id) }}>
            タスク削除
          </Button>
        </List.Item>
      )}
    />
  );

  function onStatusChange(e, id) {
    props.onStatusChange(id, e.target.value);
  }
};

export default TaskList;