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
  public notifications: number = 0;
  public message;
  

  constructor() { }

  

  ngOnInit() {
      this.pusherListen();
  }

  private pusherListen() {
      var pusher = new Pusher('xxxxxxxxxxxxxxxxx', {
          cluster: 'us2',
          forceTLS: true,
      });
      var channel = pusher.subscribe('branches_channel');
      channel.bind_global(function(event, data) {
        this.message = data.user;
          console.log('Received my-event with message: ' + data.user);
          if (data.user) {
              this.notifications++;
          }
        });
  }

  view() {
      this.notifications = 0;
  }
}
