import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    const trimmedValue = value.trim();
    if (trimmedValue.length <= maxLength) {
      return trimmedValue;
    } else {
      const truncatedValue = trimmedValue.substring(0, maxLength);
      return truncatedValue.trim() + '...';
    }
  }

}
