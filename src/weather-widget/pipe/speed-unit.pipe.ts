import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "speedUnit"
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch (unitType) {
            case 'mph':
                const miles = speed * 1.6;
                return miles + unitType
            default:
                const kilometers = speed;
                return kilometers + unitType;
        }
    }
}