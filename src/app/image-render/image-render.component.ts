import { Component } from '@angular/core';

@Component({
  selector: 'app-image-render',
  templateUrl: './image-render.component.html',
  styleUrls: ['./image-render.component.scss']
})
export class ImageRenderComponent {

  imageSrc: string | ArrayBuffer | any;

  agInit(params: any): void {
    debugger
    this.imageSrc = params;
  }

}
