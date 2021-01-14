import React, { useState, useEffect, useContext } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import style from './style.module.css';
import Finished from '../../assets/SVG/Finished.svg';
import Unfinished from '../../assets/SVG/Unfinished.svg';
import { TasksContext } from '../../context/context';
import Timer from '../Timer';

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
                  ? <>
                      <img
                        onClick={() => {
                          if (!editedTask || (editedTask && editedTask === task)) {
                            setSuccess(task.changeSuccess());
                          }
                        }}
                        src={task.success ? Finished : Unfinished}
                        alt="Unfinished"
                      />
                      <span
                        className={`${style.text} ${task.success ? style.finished : style.unfinished}`}
                      >
                        {task.name}
                      </span>
                    </>
                  : <></>}
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
              : <input
                autoFocus={true}
                className={style.editForm}
                value={inputValue}
                onChange={(e) => {
                  const newValue = e.target.value.trim();
                  task.changeName(newValue);
                  setInputValue(newValue);
                }}
                onBlur={() => {
                  setEditedTask(undefined);
                }}
              />}

        </li>
  );
};

export default Task;
