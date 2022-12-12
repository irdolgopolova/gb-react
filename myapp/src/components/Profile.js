import { useCallback, useState } from "react";
import { changeName } from "../store/profile/actions";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { getProfileName } from "../store/profile/selectors";

export default function Profile() {
    const userName = useSelector(getProfileName, shallowEqual);

    const [value, setValue] = useState('');

    const dispatch = useDispatch();

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, [dispatch]);

    const setName = useCallback(() => {
        dispatch(changeName(value))
    }, [dispatch, value]);

    return (
        <>
            <div>
                <h4>Профиль</h4>
            </div>
            <div>
                <p>Текущее имя {userName}</p>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button onClick={setName}>Изменить имя</button>
            </div>
        </>
    );
}