import React, { useContext, useState } from 'react';

import style from './style.module.css';
import { TasksContext } from '../../context/context';

class Task {
  constructor(name, tasks, neededTime = 0) {
    this.name = name;
    this.storage = tasks;
    this.success = false;
    this.date = new Date();
    this.neededTime = neededTime;
    this.timerState = false;
  }

  deleteSelf() {
    this.storage.splice(this.storage.indexOf(this), 1);
  }

  changeSuccess() {
    this.success = !this.success;
    return this.success;
  }

  changeName(newName) {
    this.name = newName;
  }
}

function addNewTask(name, DB, time) {
  DB.tasks.push(new Task(name, DB.tasks, time));
}

const InputComponent = ({
  setFocus, setItemsLeft, itemsLeft,
}) => {
  const [taskName, setTaskName] = useState('');
  const [minute, setMinute] = useState('');
  const [seconds, setSeconds] = useState('');
  const tasksContext = useContext(TasksContext);
  const createHandler = (e) => {
    if (e.target.value) {
      addNewTask(e.target.value, tasksContext, (minute * 60) + seconds * 1);
      setItemsLeft(itemsLeft + 1);
    }
    setSeconds('');
    setMinute('');
    setFocus(false);
    setTaskName('');
  };
  return <div className={style.InputContainer}>
        <input
          type="text"
          className={style.InputComponent}
          placeholder="What needs to be done?"
          autoFocus={true}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
          // onBlur={(e) => {
          //   createHandler(e);
          // }}
          onKeyDown={ (e) => {
            if (e.key === 'Enter') {
              createHandler(e);
            }
          }}
          onClick={() => {
            setFocus(true);
          }}
          value={taskName}
          />
          <div className={style.timeInputs}>
            <input
              max="2"
              type="number"
              value={minute}
              onKeyDown={ (e) => {
                if (e.key === 'Enter') {
                  createHandler(e);
                }
              }}
              onChange={(e) => {
                const text = e.target.value;
                setMinute(text.length > 2 ? text.substr(1) : text);
              }}
              className={style.timeInput}
              placeholder="Min"
            />
            <input
              type="number"
              className={style.timeInput}
              placeholder="Sec"
              value={seconds}
              max="2"
              onKeyDown={ (e) => {
                if (e.key === 'Enter') {
                  createHandler(e);
                }
              }}
              onChange={(e) => {
                const text = e.target.value;
                setSeconds(text.length > 2 ? text.substr(1) : text);
              }}/>
          </div>
    </div>;
};

export default InputComponent;
