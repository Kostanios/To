import { All, Active, Completed } from '../Footer/const/filters';

export const filterHadler = (tasks, filter) => {
  switch (filter) {
    case All: return tasks;
    case Active: return tasks.filter((e) => { if (!e.success) { return true; } return false; });
    case Completed: return tasks.filter((e) => { if (e.success) { return true; } return false; });
    default: return tasks;
  }
};
