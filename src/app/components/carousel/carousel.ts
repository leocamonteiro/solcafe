import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-carousel',
  imports: [ ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Carousel {
    spaceBetween = 10;

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }


}
