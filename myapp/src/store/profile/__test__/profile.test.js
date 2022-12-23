import { CHANGE_NAME } from "../actions";
import { initialState, profileReducer } from "../reducer";

describe('Тестирование Profile', () => {
    it('Тестирование смены имени', async () => {
        const action = {
            type: CHANGE_NAME,
            payload: "Irina"
        };

        expect(profileReducer(initialState, action)).toEqual({
            ...initialState,
            name: "Irina",
        });
    });
});