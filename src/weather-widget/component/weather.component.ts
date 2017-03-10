import { Component, OnInit } from '@angular/core'
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather'
import { Location } from '../model/location'

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: "weather.component.html",
    styleUrls: ["weather.component.css"],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "kph";
    currentTempertureUnit = "F"
    currentLocation = new Location(null, null);

    constructor(private service: WeatherService) { }

    //Hook into the initilization of component
    ngOnInit() {
        this.initCurrentLocation()
    }

    initCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position
                this.getCurrentWeather()
                this.getLocationName()
            },
            err => console.log(err))
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                //Copy data from results
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"],
                this.weatherData.summary = weather["currently"]["summary"]
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.wind = weather["currently"]["windSpeed"],                              
                this.weatherData.summary = weather["currently"]["summary"]
                console.log("Weather: ", this.weatherData)

            },
            err => console.error(err))
    }

    getLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                this.currentLocation.city = location.results[1].address_components[3].long_name
                this.currentLocation.state = location.results[1].address_components[5].long_name
            })
    }
}
