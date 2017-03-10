import { Pipe, PipeTransform } from "@angular/core"


@Pipe({
    name: "tempertureUnit"
})

export class TempertureUnitPipe implements PipeTransform {
    transform(temperture: number, unitType: String) {
        switch (unitType) {
            case "C":
                return this.formatTemperture(this.convertFtoC(temperture)) + "°" + unitType
            default:
                return this.formatTemperture(temperture) + "°" + unitType
        }
    }

    convertFtoC(temp: number){
        return (temp - 32) * (5 / 9)
    }

    formatTemperture(temp: number){
        return parseInt(String(temp), 10)
    }


}

