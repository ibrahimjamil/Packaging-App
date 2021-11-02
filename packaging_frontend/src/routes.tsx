import Home from "./views/Home";
import Packaging from "./views/Packaging";

export const BASE_URL = '/packaging';

const route = [
    {
        path: BASE_URL + '/:id',
        title: 'packaging',
        component: Packaging,
    },

]

export default route