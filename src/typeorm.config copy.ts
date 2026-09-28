import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  
  password: process.env.DB_PASSWORD || 'Luka1234',
  database: process.env.DB_NAME || 'luka_assessment',
  synchronize: false, // Set to true only in development if you want auto-migrations
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/documents/document.entity.ts',
    'src/invitations/invitation.entity.ts',
    'src/users/user.entity.ts',
    'src/workspaces/workspace.entity.ts',
  ],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});