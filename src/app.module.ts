import { NgModule } from '@angular/core';
//Allows you to run the application in a browser
import { BrowserModule } from '@angular/platform-browser';
//Allow our app to create http requests
import { JsonpModule } from '@angular/http';

//Import Component
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component'

//Create a decorator
//A decorator modifies an instance before it will be used.
//App Module creates a foundation for the app
@NgModule({
    imports : [BrowserModule, JsonpModule],
    //Declare Component
    declarations : [ AppComponent, WeatherComponent ],
    //Initialize Component
    bootstrap : [ AppComponent ]
})

export class AppModule{}