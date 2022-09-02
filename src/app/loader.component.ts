import {Component, EventEmitter} from '@angular/core';
import {FieldType, FormlyFieldConfig} from '@ngx-formly/core';
import {Form, FormGroup, NgForm} from "@angular/forms";
import {CustomFormlyFieldConfig} from "./CustomFormlyFieldConfig";
import {MatStepper} from "@angular/material/stepper";
import {delay, firstValueFrom, Observable, of} from "rxjs";
import {EventServiceService} from "./event-service.service";

@Component({
  selector: 'app-loader',
  template: `
    <h1 mat-dialog-title>Please wait</h1>
    <div mat-dialog-content style="display: flex; flex-direction: column; align-content: center; justify-content: center">
      <mat-spinner></mat-spinner>
    </div>
  `,
  providers: []
})
export class LoaderComponent {
}
