import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.listen(5000, () => console.log('Server running on http://localhost:5000'));
