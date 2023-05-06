import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidPathExp } from '../../utils/tool.util';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ISideNavConfig } from '../../models/sidenav-config';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less'],
  animations: [
    trigger('growShrink', [
      state(
        'grow',
        style({
          width: '*',
        })
      ),
      state(
        'shrink',
        style({
          width: 110,
        })
      ),
      transition('grow<=>shrink', [animate(100)]),
    ]),
  ],
})
export class SideNavComponent implements OnInit {
  state: 'grow' | 'shrink' = 'grow';
  private _subscription: Subscription;
  groups = {
    first: '',
    second: '',
    third: '',
  };
  models: Array<ISideNavConfig> = [];

  constructor(private _router: Router) {
    this._subscription = this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let mode = e.urlAfterRedirects.match(ValidPathExp);
        if (mode && mode.groups && mode.groups['first']) {
          Object.assign(this.groups, mode.groups);
          import(`src/assets/json/${mode.groups['first']}.json`).then(
            (config) => {
              this.models = config.data;
            }
          );
        }
      }
    });
  }

  ngOnInit(): void {}

  toggle() {
    if (this.state == 'grow') {
      this.state = 'shrink';
    } else {
      this.state = 'grow';
    }
  }
}
