import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'shortNamePipe'
})
export class ShortNamePipe implements PipeTransform {
  transform(fullName: string): any {
    fullName.trim().toLocaleLowerCase();
    let nameStandardizer = '';
    // tslint:disable-next-line:no-unused-expression
    for (let i = 0; i <= fullName.length; i++) {
      if (fullName.charAt(i) === ' ' && fullName.charAt(i + 1) === ' ') {
        continue;
      }
      if (i === 0 || fullName.charAt(i - 1) === ' ') {
        nameStandardizer += fullName.charAt(i).toLocaleUpperCase();
        continue;
      }
      nameStandardizer += fullName.charAt(i);
    }
    return nameStandardizer;
  }
}
