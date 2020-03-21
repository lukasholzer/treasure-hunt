import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { PlayerService } from './player.service';
import { CommonModule } from '@angular/common';

const url = 'http://localhost:3333';

const config: SocketIoConfig = { url, options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
