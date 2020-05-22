import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notifications';
  totalProducts$: Observable<number>;
  public notifications = 0;
  public message;


  constructor() { }



  ngOnInit() {
    this.pusherListen();
    console.log('notificaciones INIT', this.notifications)
  }

  public pusherListen() {
    const pusher = new Pusher('xxxxxxxxxxxxxxx', {
      cluster: 'us2',
      forceTLS: true,
    });
    const channel = pusher.subscribe('branches_channel');
    channel.bind_global((event, data) => {
      this.message = data.user;
      console.log('Received my-event with message: ' + data.user);
      if(event != 'pusher:subscription_succeeded'){
        this.notifications++;
      }
    });
  }
  public contar() {
    this.notifications++;
    console.log('notificaciones', this.notifications)
  }

  view() {
    this.notifications = 0;
  }
}
