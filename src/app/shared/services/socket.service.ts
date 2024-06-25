import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService{

  baseUrl = environment.socketUrl
 // message$: BehaviorSubject<string> = new BehaviorSubject('');
  user:any = localStorage.getItem('user')

  constructor() {
  }
  
  socket = io(this.baseUrl,{
    auth: {
      user : this.user
    }
  }

  )

  // async connectSocket(){
  //   try {
  //     this.user = localStorage.getItem('user');
  //     if (this.user){
  //       this.socket.auth = this.user
  //       this.socket.connect();
  //     }
  //   } catch (error) {
      
  //   }
  // }

  // sendMessage(message: any){
  //   console.log('sendMessage:', message);
  //   this.socket.emit('message', message);
  // }

  // getNewMessage =() =>{
  //   this.socket.on('message', (message)=> {
  //     this.message$.next(message);
  //   });

  //   return this.message$.asObservable();
  // }


  joinRoom(room: string) {
    this.socket.emit('joinRoom', { room });
  }

  leaveRoom(room: string) {
    this.socket.emit('leaveRoom', { room });
  }

  sendMessage(room: string, message: string, receptor: string) {
    this.socket.emit('message', { room, message ,receptor});
  }

  onMessage(callback: (data: any) => void) {
    this.socket.on('message', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }


}
