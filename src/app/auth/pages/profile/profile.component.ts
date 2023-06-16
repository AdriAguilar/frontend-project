import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/Response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;

  constructor( private as: AuthService ) { }

  ngOnInit(): void {
    this.user$ = this.as.user$;
  }
  
}
