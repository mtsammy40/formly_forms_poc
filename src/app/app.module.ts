import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyFieldStepper} from "./stepper.type";
import {CommonModule} from "@angular/common";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {FormlyMaterialModule} from "@ngx-formly/material";

@NgModule({
  declarations: [
    AppComponent,
    FormlyFieldStepper
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyMaterialModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
