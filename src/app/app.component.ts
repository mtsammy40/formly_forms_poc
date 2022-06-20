import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ibpoc';
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  // @ts-ignore
  // @ts-ignore
  fields: any[] = [
    {
      "type": "stepper",
      "fieldGroup": [

        {
          "templateOptions": {
            "label": "Step 1"
          },
          "fieldGroup": [
            {
              "key": "otherAccNo",
              "type": "input",
              "fetchUrl": "",
              "responseType": "",
              "templateOptions": {
                "label": "Select destination account",
                "type": "text",
                "minLength": 2,
                "required": true,
                "attributes": {
                  "ib_action": "validateAccount",
                  "ib_display_response": true
                }
              }
            }
          ]
        },
        {
          "templateOptions": {
            "label": "Step 2"
          },
          "fieldGroup": [
            {
              "key": "amount",
              "type": "input",
              "fetchUrl": "",
              "responseType": "",
              "validateUrl": "",
              "templateOptions": {
                "type": "number",
                "label": "Amount",
                "min": 100,
                "max": 100000,
                "required": "true"
              },
              "hideExpression": "!model.otherAccNo"
            }
          ]
        },
        {
          "templateOptions": {
            "label": "Step 3"
          },
          "fieldGroup": [
            {
              "key": "OTP",
              "type": "input",
              "fetchUrl": "",
              "responseType": "",
              "templateOptions": {
                "label": "Enter OTP",
                "placeholder": "****",
                "required": "true",
                "minLength": 4,
                "maxLength": 4
              },
              "hideExpression": "!model.amount"
            }
          ]
        },
        {
          "templateOptions": {
            "label": "Done"
          },
          "fieldGroup": [
            {
              "key": "confirm",
              "type": "input",
              "fetchUrl": "",
              "responseType": "",
              "templateOptions": {
                "label": "Do you want to transfer Ksh.<amt> to <otherAccNo>? \n1.Accept\n2.Cancel",
                "type": "number"
              },
              "expressionProperties": {
                "hideExpression": "!model.OTP"
              }
            }
          ]
        }
      ]
    }
  ];

  onSubmit(model: any) {
    console.log('Submitting ...', model);
  }
}
