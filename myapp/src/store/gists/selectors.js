import { API_URL_PUBLIC } from "../../components/GistsList";
import { getGistsFailure, getGistsRequest, getGistsSuccess } from "./actions";

export const getAllGists = () => async (dispatch) => {
    dispatch(getGistsRequest());
    try {
        const res = await fetch(API_URL_PUBLIC);
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        const result = await res.json();
        dispatch(getGistsSuccess(result));
    } catch (err) {
        dispatch(getGistsFailure(err.message));
    }
};

export const selectGists = (state) => state.gists.gists;
export const selectGistsError = (state) => state.gists.error;
export const selectGistsLoading = (state) => state.gists.loading;