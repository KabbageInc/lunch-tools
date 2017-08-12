import {join} from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as lunchRoutes from './routes/lunches';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env['COOKIE_SECRET'] || 'cookie_secret'));

// API routes

app.use('/api/v2/lunches', lunchRoutes);

/*------- Angular client on Root ------- */
app.set('view engine', 'html');
app.use(express.static(join(__dirname, '../client')));
app.get('/*', function(req, res){
  return res.sendFile(join(__dirname, '../client/index.html'));
});

app.all('*', function(req, res){
  return res.status(404).send('404 UNKNOWN ROUTE');
});

const port = process.env['NODE_PORT'] || process.env['PORT'] || 3000; 

app.listen(port);
console.log('App started on port', port);

module.exports = app;
