import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/common/service/language-service';

@Component({
  selector: 'app-underwater',
  templateUrl: './underwater.component.html',
  styleUrls: ['./underwater.component.less'],
})
export class UnderwaterComponent implements OnInit {
  constructor(private _languageService: LanguageService) {}

  ngOnInit(): void {}
}
