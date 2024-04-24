import express from 'express';
import morgan from 'morgan';

const app = express();
// useful logger
app.use(morgan('dev'));
// help server read incoming JSON data in req.body
app.use(express.json());
// help server read incoming form data in req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' });
});

export default app;
