import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends AbstractView implements OnInit {
  
  constructor() {
    super();
  }

  ngOnInit(): void {
    
  }
}
