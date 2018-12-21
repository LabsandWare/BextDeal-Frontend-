import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-error',
  template: `
    <p>
      error works!
    </p>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
