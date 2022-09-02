import {Component, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {EventServiceService} from "./event-service.service";

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
            "label": "Step 1",
            "attributes":{
              "ib_action": "fetchFields"
            },
          },
          "fieldGroup": [
            {
              "key": "eloanCode",
              "type": "select",
              "fetchUrl": "/ibPortal/eloanTypesEncrypted",
              "responseType": "LOANS",
              "templateOptions": {
                "label": "Select Eloan Type",
                "required": "true",
                "options": [
                  { label: 'Account 1 | 123456777', value: '123456777' },
                  { label: 'Account 2 | 100001001', value: '100001001' }
                ],
                "attributes": {
                  "ib_action": "fetchFields"
                },
              },
            }
          ]
        },
        {
          "templateOptions": {
            "label": "Step 3"
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
            }
          ]
        },
        {
          "templateOptions": {
            "label": "Step 4"
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
              }
            }
          ]
        }
      ]
    }
  ];

  constructor(private eventService: EventServiceService) {
    eventService.listen().subscribe(event => {
      console.log('On update config', event)
      if(event._event) {
        switch (event._event) {
          case 'configModified':
            this.fields[0]?.fieldGroup.splice(event._atIndex, 0, ...event.data)
            this.fields = [...this.fields];
            console.log('new fields ', this.fields);
            break;
        }
      }
    })
  }

  onSubmit(model: any) {
    console.log('Submitting ...', model);
  }
}
