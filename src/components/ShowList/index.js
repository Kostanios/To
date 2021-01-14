import React, { useState } from 'react';

import style from './style.module.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import { TasksContext } from '../../context/context';

const defaultTaskContext = {
  tasks: [],
};

const ShowList = () => {
  const [newTaskFormFocus, setNewTaskFormFocus] = useState(true);
  const [activeFilter, setActiveFilter] = useState(undefined);
  const [itemsLeft, setItemsLeft] = useState(0);
  return (
        <TasksContext.Provider value={defaultTaskContext}>
            <div className={style.showListApp}>
                <NewTaskForm
                    itemsLeft={itemsLeft}
                    setItemsLeft={setItemsLeft}
                    focus={newTaskFormFocus}
                    setFocus={setNewTaskFormFocus}
                />
                <TaskList
                    itemsLeft={itemsLeft}
                    setItemsLeft={setItemsLeft}
                    activeFilter={activeFilter}
                />
                <Footer
                    itemsLeft={itemsLeft}
                    setItemsLeft={setItemsLeft}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
            </div>
        </TasksContext.Provider>
  );
};

export default ShowList;
