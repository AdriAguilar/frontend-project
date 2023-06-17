import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSource = new Subject<void>();
  showPopup$ = this.showPopupSource.asObservable();

  show(): void {
    this.showPopupSource.next();
  }
}
