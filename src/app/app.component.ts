import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { Observable } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
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


  constructor(private _snackBar: MatSnackBar) { }



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
      
      let req = data.req_number;
      
      if(event != 'pusher:subscription_succeeded'){
        this.notifications++;
        this.message = ` ${data.user} realizó una nueva requisición`;
        this.openSnackBar(this.message );
      }
      
    });
  }

  public openSnackBar(message: string) {
    
    
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
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
