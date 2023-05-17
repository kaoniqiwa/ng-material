import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidPathExp } from '../../utils/tool.util';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ISideNavConfig } from '../../interface/sidenav-config.interface';

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
export class SideNavComponent implements OnInit,OnDestroy {
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
  clickBtn(model: ISideNavConfig) {
    // console.log(model);
    if (!model.CanNavigate) {
      let mode = model.path.match(ValidPathExp);
      if (mode?.groups?.['second'] == this.groups.second) {
        console.log('同一父标签');
        return;
      }
    }

    this._router.navigateByUrl(model.path);
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
