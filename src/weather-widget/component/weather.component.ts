import { Component, OnInit } from '@angular/core'
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather'
import { Location } from '../model/location'
import { WEATHER_COLORS} from '../constants/constants'

//Set to avoid typescript aerror
declare var Skycons: any;

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
    currentLocation = new Location(null, null);
    icons = new Skycons({
        "color": "#fff"
    });
    dataRecieved =false;

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
                this.setIcon()
                //Set dataRecieved, thiss will trigger the display of the widget
                this.dataRecieved = true;

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

    toggleUnits(){
        this.toggleSpeedUnits()
        this.toggleTempUnits()
        console.log("toggleUnits")
    }

    toggleTempUnits(){
        if (this.currentTempertureUnit == "C"){
            this.currentTempertureUnit = "F"
        } else {
            this.currentTempertureUnit = "C"
        }
    }

    toggleSpeedUnits(){
        if(this.currentSpeedUnit == "kph"){
            this.currentSpeedUnit = "mph"
        } else {
            this.currentSpeedUnit = "kph"
        }
    }

    setIcon(){
        //Skycons obect
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play()
    }

    setStyles(): Object{
        if(this.weatherData.icon){
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"]
            return WEATHER_COLORS[this.weatherData.icon]
        } else {
            this.icons.color = WEATHER_COLORS.default.color;
            return WEATHER_COLORS.default
        }
    }
}
