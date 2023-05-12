import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import axios from 'axios';
import { filter } from 'rxjs';
import { ValidPathExp } from 'src/app/common/utils/tool.util';
@Component({
  selector: 'station-archive',
  templateUrl: './station-archive.component.html',
  styleUrls: ['./station-archive.component.less'],
})
export class StationArchiveComponent implements OnInit {
  show = true;

  constructor(private _router: Router) {
    this._router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        let mode = e.urlAfterRedirects.match(ValidPathExp);
        if (
          mode &&
          mode.groups &&
          mode.groups['second'] == 'station-archive' &&
          !mode.groups['third']
        ) {
          // console.log('show');
          this.show = true;
        } else {
          // console.log('hide');
          this.show = false;
        }
      });
  }

  ngOnInit(): void {}
}
