import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    // return value ? items.filter(item => item.productName === value) : items;
    if (!items) { return []; }
    if (!value) { return items; }

    return items.filter(singleItem =>
      singleItem.productName.toLowerCase().includes(value.toLowerCase())
    );

  }

}
