import React, { useState, useEffect, useContext } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import style from './style.module.css';
import { TasksContext } from '../../context/context';
import Timer from '../Timer';
import Icons from '../Icons';
import TaskEditForm from '../TaskEditForm';

const Task = ({
  task, editedTask, setEditedTask, itemsLeft, setItemsLeft,
}) => {
  const tasksContext = useContext(TasksContext);
  const [bolean, render] = useState(false);
  const [success, setSuccess] = useState(task.success);
  // const [leadMode, setLeadMode] = useState(false);
  // const [CurrentLeadTime, CurrentLeadTime] = useState(0);
  useEffect(() => {
    if (success !== task.success) { setSuccess(task.success); }
    setTimeout(() => {
      render(!bolean);
    }, 30000);
  }, [bolean, success, task.success]);
  const [inputValue, setInputValue] = useState(task.name);
  function deleteTask(taskToDelete, DB) {
    DB.splice(DB.indexOf(taskToDelete), 1);
  }
  return (
        <li className={style.TaskContainer}>
            <label className={style.description}>

                {editedTask !== task
                  ? <Icons task={task} editedTask={editedTask} setSuccess={setSuccess}/>
                  : null}
            </label>
            {editedTask !== task
              ? <label className={style.manipulation}>
                  <Timer task={task} render={render} bolean={bolean}/>
                  <label className={style.timeInterval}>{formatDistanceToNow(task.date)}</label>
                  <button
                    onClick={() => {
                      setEditedTask(task);
                    }}
                    className={style.edit}
                    >
                      {'✎'}
                    </button>
                  <button
                    className={style.delete}
                    onClick={() => {
                      deleteTask(task, tasksContext.tasks);
                      setItemsLeft(itemsLeft - 1);
                    }}>{'×'}</button>
                </label>
              : <TaskEditForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                task={task}
                setEditedTask={setEditedTask}
              />}

        </li>
  );
};

export default Task;
