import Sequelize from 'sequelize';

import {database} from '../config';
export default new Sequelize(database.default);