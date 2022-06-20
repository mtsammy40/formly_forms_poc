import {Component} from '@angular/core';
import {FieldType, FormlyFieldConfig} from '@ngx-formly/core';
import {Form, FormGroup, NgForm} from "@angular/forms";
import {CustomFormlyFieldConfig} from "./CustomFormlyFieldConfig";
import {MatStepper} from "@angular/material/stepper";

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
                  (click)="onNext(step, matStepper)">
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
})
export class FormlyFieldStepper extends FieldType {
  isValid(field: CustomFormlyFieldConfig): any {
    if (field.key) {
      // @ts-ignore
      return field.formControl.valid;
    }

    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true;
  }

  performAction(field: CustomFormlyFieldConfig, form: FormGroup): any {
    console.log('Call Api...', field);
    console.log('Data...', form.value);
  }

  async onNext(step: FormlyFieldConfig, stepper: MatStepper): Promise<void> {
    console.log('On next ...', step);
    let actions: any = step.fieldGroup?.filter((fieldGroup) => !!fieldGroup?.templateOptions?.attributes?.['ib_action']).map((fieldGroup) => fieldGroup?.templateOptions?.attributes?.['ib_action']);
    if (actions && actions.length > 0) {
      for (let action of actions) {
        let response = await this.callBackend(action, step.model);
        console.log('Response from backend', response);
        let displayResponse: any = step.fieldGroup?.filter((fieldGroup) => !!fieldGroup?.templateOptions?.attributes?.['ib_display_response']).map((fieldGroup) => fieldGroup?.templateOptions?.attributes?.['ib_display_response']);
        if(displayResponse) {
          console.log('Dialog display ...', response.message);
        } else {
          // next
        }
        if(response.code === "00") {
          stepper.next();
        } else {
          // stay
        }
      }
    }
  }

  async callBackend(action: string, model: any): Promise<any> {
    if (model) {
      model.validateType = action;
    } else {
      model = {validateType: action}
    }
    console.log('Calling backend...', action, model);
    let response = {"code": "01", "message": "Customer name is Danny Owalo"}
    return response;
  }
}
