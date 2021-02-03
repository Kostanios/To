import React, { useContext, useState } from 'react';

import style from './style.module.css';
import Task from '../Task';
import { TasksContext } from '../../context/context';
import { filterHadler } from '../utils/filterHandler';

const TaskList = ({ activeFilter, setItemsLeft, itemsLeft }) => {
  const taskContext = useContext(TasksContext);
  const [editedTask, setEditedTask] = useState(null); // переименовать и не изменять по сслыке
  const Tasks = filterHadler(taskContext.tasks, activeFilter).map((task) => (
            <Task
              setItemsLeft={setItemsLeft}
              itemsLeft={itemsLeft}
              editedTask={editedTask}
              setEditedTask={setEditedTask}
              key={task}
              task={task}
            />
  ));
  return <ul className={style.TaskListContainer}>
        {Tasks}
    </ul>;
};

export default TaskList;
