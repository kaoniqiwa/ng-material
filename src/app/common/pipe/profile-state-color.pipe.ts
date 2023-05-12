import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileStateColor',
})
export class ProfileStateColorPipe implements PipeTransform {
  transform(state: number) {
    switch (state) {
      case 1:
        return '#ef6464';
      case 2:
        return '#ffba00';
      case 3:
        return '#ff0';
      case 4:
        return '#21E452';
      case 5:
        return 'cyan';
      case 6:
        return '#6997ff';
      case 7:
        return '#ca98f9';
      case 8:
        return '#fff';
      default:
        return '#fff';
    }
  }
}
