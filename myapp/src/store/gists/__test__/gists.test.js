import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../..';
import GistsList from './../../../components/GistsList';

describe('Тестирование раздела Gists', () => {
    it('Тестирование компонента GistsList', () => {
        const component = render(
            <Provider store={store}>
                <GistsList />
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
});