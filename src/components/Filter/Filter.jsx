import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <label className={css.Filter}>
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={changeFilter}></input>
    </label>
  );
};
