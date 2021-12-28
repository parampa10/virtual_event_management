import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {
  createMeetingForm: any;

  constructor(
    private _fb: FormBuilder,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.createMeetingForm = this._fb.group({
      name: ['', Validators.required],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      duration_hours: ['', [Validators.required]],
      duration_minutes: ['', [Validators.required]],
    })
  }
  onSubmit() {
    if (this.isFormValid) {
      this.scheduleMeeting();
    }
  }
  private scheduleMeeting() {
    const payloads = this.createMeetingForm.value;
    this._httpClient.post(`${environment}/createmeeting`, payloads).subscribe((res: any) => {
      this.displayMessage(res.message);
    }, (error: any) => {
      this.displayMessage(error.message);
    })
  }
  private displayMessage(message: string) {
    this._snackBar.open(message, "Okay", {
      duration: 5000
    });
  }
  private get isFormValid(): boolean {
    return this.createMeetingForm.valid;
  } 
}
