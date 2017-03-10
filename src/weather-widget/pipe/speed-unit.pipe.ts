import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "speedUnit"
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch (unitType) {
            case 'kph':
                return this.formatSpeed(this.convertMPHtoKPH(speed)) + unitType
            default:
                return this.formatSpeed(speed) + unitType
        }
    }

    convertMPHtoKPH(speed){
        return speed*1.60934
    }

    formatSpeed(speed: number){
        return parseInt(String(speed), 10)
    }
}