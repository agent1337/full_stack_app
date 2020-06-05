import React from 'react'
import {render,fireEvent} from '@testing-library/react'
import Home from '../Home'
import api, {User} from "../../../api/api";
import {unmountComponentAtNode} from "react-dom";

let container: any = null;

describe('Home', function () {
    beforeEach(() => {
        // подготавливаем DOM-элемент, куда будем рендерить
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // подчищаем после завершения
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    describe('Home', function () {

        it('should to match snapshot', function () {
            const {container} = render(<Home/>, {});

            expect(container).toMatchSnapshot()
        });


        it('should send get req on mount', function () {
            const axiosGetSpy = jest.spyOn(api, 'getUsers').mockResolvedValue([{} as User]);

            render(<Home/>, {})

            expect(axiosGetSpy).toBeCalledWith()
        });


        it('user clicks button login', function () {
            const { getByTestId } = render(<Home/>, {});

            fireEvent.click(getByTestId('button-login'))
        });
    });
});