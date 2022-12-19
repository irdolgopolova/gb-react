import { useCallback, useState } from "react";
import { changeName } from "../store/profile/actions";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { getProfileName } from "../store/profile/selectors";
import { Profile } from "./Profile";

export default function ProfileContainer() {
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
        <Profile
            userName={userName}
            value={value}
            handleChange={handleChange}
            setName={setName}
        />
    );
}