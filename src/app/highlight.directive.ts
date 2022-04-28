import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  //directive gives common functionality to the html elements

  //add "appHighlight" to use it on a tag
  constructor(private element:ElementRef) { 
    console.log("Element we got: ", this.element.nativeElement)
    this.element.nativeElement.style.color="yellow"
  }

}
