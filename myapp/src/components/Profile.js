import { useCallback } from "react";
import { toggleShowName } from "../store/profile/actions";
import { useSelector, useDispatch } from 'react-redux'

export default function Profile() {
    const { showName, name } = useSelector((state) => state);
    const dispatch = useDispatch();

    const setShowName = useCallback(() => {
        dispatch(toggleShowName);
    }, [dispatch]);

    return (
        <div>
            <h4>Профиль</h4>
            <input
                type="checkbox"
                defaultChecked={showName}
                value={showName}
                onChange={setShowName}
            />
            <span>Показывать имя</span>
            {showName && <div>{name}</div>}
        </div>
    );
}