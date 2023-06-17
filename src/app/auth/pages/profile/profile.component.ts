import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/Response.interface';
import { ProfilePopupService } from '../../services/profile-popup.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  hostname: string = environment.hostname;

  constructor( private as: AuthService,
               private pps: ProfilePopupService ) { }

  ngOnInit(): void {
    this.user$ = this.as.user$;
  }

  showPopup(): void {
    this.pps.show();
  }
  
}
