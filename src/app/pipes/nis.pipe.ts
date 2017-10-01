import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nis'})
export class NisPipe implements PipeTransform {
  transform(value: number): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ₪';
  }
}