import style from './styles.module.css';
import Finished from '../../assets/SVG/Finished.svg';
import Unfinished from '../../assets/SVG/Unfinished.svg';

const Icons = ({ task, editedTask, setSuccess }) => <>
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
  </>;

export default Icons;
