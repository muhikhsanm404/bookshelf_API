import dotenv from 'dotenv';

dotenv.config();

const environments = {
  HOST: process.env.HOST || 'localhost',
  PORT: Number(process.env.PORT) || 9000,
};

export default environments;
