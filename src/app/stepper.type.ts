import {Component, EventEmitter} from '@angular/core';
import {FieldType, FormlyFieldConfig} from '@ngx-formly/core';
import {Form, FormGroup, NgForm} from "@angular/forms";
import {CustomFormlyFieldConfig} from "./CustomFormlyFieldConfig";
import {MatStepper} from "@angular/material/stepper";
import {delay, firstValueFrom, Observable, of, tap} from "rxjs";
import {EventServiceService} from "./event-service.service";
import {MatDialog} from "@angular/material/dialog";
import {LoaderComponent} from "./loader.component";

@Component({
  selector: 'formly-field-stepper',
  template: `
    <mat-horizontal-stepper #matStepper>
      <mat-step
        *ngFor="let step of field.fieldGroup; let index = index; let last = last;">
        <ng-template matStepLabel>{{ step.templateOptions?.label }}</ng-template>
        <formly-field [field]="step"></formly-field>

        <div>
          <button matStepperPrevious *ngIf="index !== 0"
                  class="btn btn-primary"
                  type="button">
            Back
          </button>

          <button *ngIf="!last"
                  class="btn btn-primary" type="button"
                  [disabled]="!isValid(step)"
                  (click)="onNext(step, matStepper, form)">
            Next
          </button>


          <button *ngIf="last" class="btn btn-primary"
                  [disabled]="!form.valid"
                  type="submit">
            Submit
          </button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
  providers: []
})
export class FormlyFieldStepper extends FieldType {
  constructor(private eventService: EventServiceService, private dialog: MatDialog) {
    super();
  }

  isValid(field: CustomFormlyFieldConfig): any {
    if (field.key) {
      // @ts-ignore
      return field?.formControl?.valid;
    }

    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true;
  }

  performAction(field: CustomFormlyFieldConfig, form: FormGroup): any {
    console.log('Call Api...', field);
    console.log('Data...', form.value);
  }

  async onNext(step: FormlyFieldConfig, stepper: MatStepper, form: any): Promise<void> {
    console.log('On next ...', step, stepper, form);
    let actions: any = step.fieldGroup?.filter((fieldGroup) => !!fieldGroup?.templateOptions?.attributes?.['ib_action']).map((fieldGroup) => fieldGroup?.templateOptions?.attributes?.['ib_action']);
    console.log('actions - ', actions.length);
    if (actions && actions.length > 0) {
      for (let action of actions) {
        console.log('action - ', action);
        let loaderDialogRef = this.dialog.open(LoaderComponent);
        let response = await firstValueFrom(this.callBackend(action, step.model));
        loaderDialogRef.close();
        console.log('response - ', response);
        if (response.fields && response.fields.length > 0) {
          let currentConfigIndex: number = 0;
          console.log('Extracted ', ...response.fields);
          this.eventService.emit('configModified', {_atIndex: currentConfigIndex + 1, data: response.fields})
        }
        let displayResponse: any = step.fieldGroup?.filter((fieldGroup) => !!fieldGroup?.templateOptions?.attributes?.['ib_display_response']).map((fieldGroup) => fieldGroup?.templateOptions?.attributes?.['ib_display_response']);
        if (displayResponse) {
          console.log('Dialog display ...', response.message);
        }
        if (response.code === "00") {
          stepper.next();
        } else {
          // stay
        }
      }
    } else {
      stepper.next();
    }
  }

  callBackend(action: string, model: any): Observable<any> {
    if (model) {
      model.validateType = action;
    } else {
      model = {validateType: action}
    }
    console.log('Calling backend...', action, model);
    let response;
    switch (action) {
      case "validateAccount":
        response = {"code": "00", "message": "Customer name is Danny Owalo"}
        break;
      case "fetchFields":
        response = {
          "code": "00", "message": "Ok", "fields": [
            {
              "templateOptions": {
                "label": "Step 2"
              },
              "fieldGroup": [
                {
                  "key": "guarantorName",
                  "type": "input",
                  "fetchUrl": "",
                  "responseType": "",
                  "validateUrl": "",
                  "templateOptions": {
                    "type": "string",
                    "label": "Guarantor Name",
                    "required": "true"
                  },
                },
                {
                  "key": "guarantorAmount",
                  "type": "input",
                  "fetchUrl": "",
                  "responseType": "",
                  "validateUrl": "",
                  "templateOptions": {
                    "type": "number",
                    "label": "Guaranteed Amount",
                    "min": 100,
                    "max": 100000,
                    "required": "true"
                  },
                }
              ]
            },
          ]
        }
        break;
      default:
        response = {"code": "00", "message": "Customer name is Danny Owalo"}
        break;
    }
    return of(response)
      .pipe(delay(2000));
  }
}
