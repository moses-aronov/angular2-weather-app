import { Component, OnInit } from '@angular/core'
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather'

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
    currentSpeedUnit = "mph";
    currentTempertureUnit = "F"
    constructor(private service: WeatherService) { }

    //Hook into the initilization of component
    ngOnInit() {
        this.getWeatherForCurrentLocation()
    }

    getWeatherForCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position
                this.getCurrentWeather()
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
}
