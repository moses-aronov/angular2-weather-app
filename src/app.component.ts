//Components 
//Can have childern, and they could have children
//They are the building blocks of your application and they are self contained.
//Very specific and one job.
//They are in charge of their own html code and styling, everything is self contained, and reusable.

import { Component } from '@angular/core';

@Component({
    selector: 'my-app', //The name of the html element 
    template: `
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <weather-widget></weather-widget>
                </div>
            </div>
        </div>
    `
})

export class AppComponent { }