import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes';
import http from 'http';
import 'dotenv/config'
import { Server } from "socket.io";

const app = express()
  
app.use(cors())
app.use(express.json());
app.use('/api', routes)

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

app.set('io', io);

io.on('connection', (socket:any) => {


    socket.on('joinRoom', (schoolId:string) => {
        const roomName = `schoolId_${schoolId}`; // Construct room name based on user type and ID
        console.log('connected to room')
        socket.join(roomName); // Immediately join the room after connection
      });

    // Handle disconnecting
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

  });



mongoose.connect(process.env.MONGODB_URI ?? '').then(()=>{
    console.log('connected')
    server.listen(3000)
}).catch((err:any)=>console.log(err))

      





