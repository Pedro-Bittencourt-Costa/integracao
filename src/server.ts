import 'reflect-metadata';
import express from 'express';
import { userRouter } from './routes/user.routes';
import { contatoRouter } from './routes/contato.routes';
import { loginRouter } from './routes/login.routes';
import { AppDataSource } from './db/data-source';

const app = express();

AppDataSource.initialize().then(() => {
  
    app.use(express.json());

    // Routes
    app.use('/usuarios', userRouter);
    app.use('/contatos', contatoRouter);
    app.use('/login', loginRouter);


    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
}).catch(error => console.log('Erro ao iniciar o DataSource:', error));

