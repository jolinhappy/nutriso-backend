import express from 'express';
import router from './routes/userRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
const port = 3000;

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
