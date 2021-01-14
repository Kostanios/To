import React, { useState, useEffect, useRef } from 'react';

import timeHandler from '../utils/timeHandler';
import styles from './styles.module.css';

const Timer = ({ task, render, bolean }) => {
  const [timerState, setTimerState] = useState(false);
  const [time, setTime] = useState(task.neededTime);
  const timerRef = useRef(null);
  useEffect(() => {
    if (timerState) {
      const timerId = setTimeout(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          task.changeSuccess();
          setTimerState(false);
          render(!bolean);
        }
      }, 1000);
      timerRef.current = timerId;
    } else {
      clearTimeout(timerRef.current);
    }
  }, [time, timerState]);
  return time
    ? (<div className={styles.timerContainer}>
      <button
        onClick={() => {
          setTimerState(!timerState);
        }}>
      {timerState ? '⏸' : '▶'}
      </button>
      <span className={styles.timer}>{timeHandler(time)}</span></div>)
    : null;
};

export default Timer;
