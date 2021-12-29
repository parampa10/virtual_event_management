import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  createMeetingForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  // validate form input and call meeting API
  onSubmit() {
    if (this.isFormValid) {
      this.scheduleMeeting();
    }
  }
  private scheduleMeeting() {
    const payloads = this.createMeetingForm.value;
    const meetingDatetime = new Date(payloads.date);
    const timeValue = payloads.time.split(':');

    // Hours are worth 60 minutes.
    const minutes = (+timeValue[0]) * 60 + (+timeValue[1]);
    meetingDatetime.setMinutes(minutes);

    // set meeting datetime
    payloads.date = meetingDatetime;

    const durationInMinutes = (payloads.duration_hours * 60) + payloads.duration_minutes;

    // set meeting duration
    payloads.duration = durationInMinutes;

    this._httpClient.post(`${environment.API_URL}/createmeeting`, payloads).subscribe((res: any) => {
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
  private initForm(): void {
    this.createMeetingForm = this._fb.group({
      name: ['', Validators.required],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      duration_hours: ['', [Validators.required]],
      duration_minutes: ['', [Validators.required]],
    })
  }
}
