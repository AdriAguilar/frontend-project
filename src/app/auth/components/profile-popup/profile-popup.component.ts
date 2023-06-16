import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

import { User } from 'src/app/interfaces/Response.interface';
import { ProfilePopupService } from '../../services/profile-popup.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  @Input() user: User;
  showPopup: boolean = false;
  editForm: FormGroup;
  files: File[] = [];

  constructor( private pps: ProfilePopupService,
               private fb: FormBuilder,
               private us: UserService ) { }

  ngOnInit(): void {
    this.pps.showPopup$.subscribe(() => {
      this.showPopup = true;
    });
    this.editForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [ this.user.name, [ Validators.required, Validators.minLength(3)]],
      username: [ this.user.username, [ Validators.required, Validators.minLength(3)]],
      email: [ this.user.email, [ Validators.required, Validators.email]],
      image: [ this.user.image ]
    })
  }

  notValid( field: string ) {
    return this.editForm.controls[ field ].errors
        && this.editForm.controls[ field ].touched;
  }
  onSelect(event: NgxDropzoneChangeEvent) {
    if( this.files.length < 1 ) {
      this.files.push(...event.addedFiles);
    }
  }
  
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  hide(): void {
    this.showPopup = false;
  }

  saveChanges(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const fieldsToCompare = ['name', 'username', 'email'];

    for (let file of this.files) {
      formData.append('image', file, file.name);
    }
    
    for (const field of fieldsToCompare) {
      if ((this.user as any)[field] !== this.editForm.get(field)?.value) {
        formData.append(field, this.editForm.get(field)?.value);
      }
    }

    formData.append('_method', 'PUT');

    this.us.updateUser( formData, this.user.id ).subscribe(
      () => {
        this.showPopup = false;
      }
    );
  }
  
}
