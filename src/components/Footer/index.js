import React, { useContext } from 'react';

import style from './style.module.css';
import { filters, Active } from './const/filters';
import { TasksContext } from '../../context/context';
import { filterHadler } from '../utils/filterHandler';

const Footer = ({
  activeFilter, setActiveFilter, itemsLeft, setItemsLeft,
}) => {
  const tasksContext = useContext(TasksContext);
  return <footer className={style.footer}>
        <span className={style.items}>{`${itemsLeft} items left`}</span>
        <ul className={style.filters}>
         {
            filters.map((filter, index) => (
                    <li key={index}>
                        <button
                            onClick={() => {
                              setActiveFilter(filter);
                            }}
                            className={filter === activeFilter ? style.selected : ''}
                        >
                            {filter}
                        </button>
                    </li>
            ))
         }
        </ul>
        <button
          onClick={() => {
            const filteredTasks = filterHadler(tasksContext.tasks, Active);
            tasksContext.tasks = filteredTasks;
            setItemsLeft(filteredTasks.length);
          }}
          className={style.clearButton}>Clear Completed</button>
    </footer>;
};

export default Footer;
