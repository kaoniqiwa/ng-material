import { Component, Input, OnInit } from '@angular/core';
// webpack本身能处理json文件,只需打开 tsconfig=>resolveJsonModule
import Config from 'src/assets/json/iconfont.json';

console.log(Config);
@Component({
  selector: 'iconfont-icon',
  templateUrl: './iconfont-icon.component.html',
  styleUrls: ['./iconfont-icon.component.less'],
})
export class IconfontIconComponent implements OnInit {
  @Input() icon: string = '';

  config: { [key: string]: string } = Config;

  get iconClass() {
    if (this.config[this.icon]) {
      return 'icon-' + this.config[this.icon];
    }
    return '';
  }
  constructor() {}

  ngOnInit(): void {}
}
