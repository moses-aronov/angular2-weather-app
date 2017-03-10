import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { FORECAST_KEY, FORECAST_ROOT, MAPS_KEY, MAPS_ROOT } from '../constants/constants'
@Injectable()

export class WeatherService {
    constructor(private jsonp: Jsonp, private http: Http) {

    }

    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos)
                })
            },
                err => {
                    return Observable.throw(err);
                })
        } else {
            return Observable.throw("Geolocation is not available")
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long
        const queryParameters = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParameters)
            .map(data => data.json())
            .catch(err => {
                console.log("Unable to get weather data - ", err)
                return Observable.throw(err.json())
            });
    }

    //Resolve Location
    getLocationName(lat: number, long: number): Observable<any> {
        const url = MAPS_ROOT
        const queryParameters = "?latlng=" + lat + "," + long + "&key=" + MAPS_KEY;

        return this.http.get(url + queryParameters)
            .map(location => location.json())
            .catch(err => {
                console.log("Unable to get location", err);
                return Observable.throw(err)
            })
    }
}