import { Router } from 'express';
import { initStaticAdmin, initStaticUpload } from '../middlewares/static';
import { isCanPost } from '../middlewares/auth'

import upload from './upload';
import admin from './admin';
import services from './services';
import work from './work';
import customer from './customer';
import employee from './employee';
import api from './api';

let siteApp = new Router();

siteApp.use(initStaticAdmin())
siteApp.use('/uploads', initStaticUpload())
siteApp.use('/upload', upload)
siteApp.use('/services', services)
siteApp.use('/work', work)
siteApp.use('/customer', customer)
siteApp.use('/employee', employee)
siteApp.use('/api', api)
siteApp.use('/', admin)



export default siteApp;