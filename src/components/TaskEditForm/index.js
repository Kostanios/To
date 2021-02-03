import style from './styles.module.css';

const TaskEditForm = ({
  task, setEditedTask, inputValue, setInputValue,
}) => <input
    autoFocus={true}
    className={style.editForm}
    value={inputValue}
    onChange={(e) => {
      const newValue = e.target.value.trim();
      task.changeName(newValue);
      setInputValue(newValue);
    }}
    onBlur={() => {
      setEditedTask(null);
    }}
/>;

export default TaskEditForm;
