import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes';
import http from 'http';
require("dotenv").config()
const { Server } = require("socket.io");

const app = express()
  
app.use(cors())
app.use(express.json());
app.use('/api', routes)
//@ts-ignore
app.io = io;

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

app.set('io', io);

io.on('connection', (socket:any) => {
    console.log('New client connected');
    
  // Handling the 'hello' event on the backend
  socket.on('hello', (message:string) => {
    console.log('Received from frontend:', message);
  });


    // Handle disconnecting
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('joinRoom', ({ schoolId }:{schoolId:string}) => {
        const roomName = `schoolId_${schoolId}`; // Construct room name based on user type and ID
        socket.join(roomName); // Add the user to the room
        // setInterval(()=>{
        //     console.log(io.sockets.adapter.rooms.get(roomName))
        // }, 2000)
      
      });

  });



mongoose.connect(process.env.MONGODB_URI ?? '').then(()=>{
    console.log('connected')
    server.listen(3000)
}).catch((err:any)=>console.log(err))

      





