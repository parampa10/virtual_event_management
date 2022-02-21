import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';



import { AuthInterceptorService } from './services/authentication/auth-interceptor.service';
import { AuthGuard } from './services/authentication/auth.guard';
import { BoothService } from './services/booth.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule, 
    AppRoutingModule,RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,RecaptchaModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    
    MatIconModule,    
    MatInputModule,
    MatToolbarModule,
    MatSlideToggleModule,    
    MatNativeDateModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSnackBarModule,
  ],
  providers: [MatDatepickerModule, {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true
  } , AuthGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }
