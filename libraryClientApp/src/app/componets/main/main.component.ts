import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbstractView } from 'src/app/core/abstractView';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent extends AbstractView implements OnInit {
  
  constructor(public messageService: MessageService) {
    super(messageService);
  }

  ngOnInit(): void {
    
  }
}
