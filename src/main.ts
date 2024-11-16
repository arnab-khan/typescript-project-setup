// This is main file for app. This file added to 'webpack.config.js' file for compilation

import './styles.scss'; // Import global styles
import { AppModule } from './app/app.module';

const appModule = new AppModule(); // Getting instance of 'AppModule' export class
appModule.bootstrap(); // Starting app