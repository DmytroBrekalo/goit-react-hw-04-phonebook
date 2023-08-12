import PropTypes from 'prop-types';
import style from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
    return (
        <label className={style.filter}>
            <span>Find contacts by name</span>
            <input
                type="text"
                name="filter"
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};