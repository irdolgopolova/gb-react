import { CircularProgress } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllGists,
    selectGists,
    selectGistsError,
    selectGistsLoading
} from "../store/gists/selectors";

export const API_URL_PUBLIC = "https://api.github.com/gists/public";
export const API_URL_GIST = "https://api.github.com/gists/";

export default function GistsList() {
    const dispatch = useDispatch();

    const gists = useSelector(selectGists);
    const error = useSelector(selectGistsError);
    const loading = useSelector(selectGistsLoading);

    const requestGists = () => {
        dispatch(getAllGists());
    };

    useEffect(() => {
        requestGists();
    }, []);


    const renderGist = useCallback(
            (gist) => <li key={gist.id}>{ gist.description }</li>,
            []
        );

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <>
                <h3>Ошибка</h3>
                <button onClick={requestGists}>Обновить</button>
            </>
        );
    }

    return <ul>{gists.map(renderGist)}</ul>;
}