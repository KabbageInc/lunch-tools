import {Component} from '@angular/core';

@Component({
  selector: 'showme',
  templateUrl: './template.html'
})
export class ShowMeComponent {

    lunch: any;
    comment: any = {};
    settings: any = {};
    info: string;
    error: string;

    constructor() {}

    postComment() {

    }

    vote(dish: string, vote: 1|-1) {

    }
}
