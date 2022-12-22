import { render } from '@testing-library/react';
import Home from './../../../components/Home';

describe('Тестирование Home', () => {
    it('Тестирование компонента Home', () => {
        const component = render(<Home authed={true} />);
        expect(component).toMatchSnapshot();
    });
});