import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class EventService {



  constructor(private socket: Socket) {}
}
