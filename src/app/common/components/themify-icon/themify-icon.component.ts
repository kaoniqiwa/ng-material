import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'themify-icon',
  templateUrl: './themify-icon.component.html',
  styleUrls: ['./themify-icon.component.less'],
})
export class ThemifyIconComponent implements OnInit {
  @Input() icon: string = 'ti-arrow-up';

  get iconClass() {
    return 'ti-' + this.icon;
  }
  constructor() {}

  ngOnInit(): void {}
}
