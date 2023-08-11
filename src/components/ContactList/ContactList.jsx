import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export const ContactList = ({ data, onDeletePerson }) => {
    return (
        <ul className={style.list}>
            {data.map(({ id, name, number }) => {
                return (
                    <li key={id} id={id} className={style.list_item}>
                        {name}: {number}
                        <button onClick={() => onDeletePerson(id)}>
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

ContactList.propTypes = {
    data: PropTypes.array.isRequired,
    onDeletePerson: PropTypes.func.isRequired,
};