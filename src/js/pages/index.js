import '../../styles/index.scss';
import '../../styles/pages/index.scss';
import InfiniteGrid from '../components/infinite-grid';

export default class Index {
  constructor() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    
    this.sources = [
      {src: 'image-1.jpg', caption: 'Calligraphy.1 <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2021'},
      {src: 'image-2.jpg', caption: 'Calligraphy.2 <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
      {src: 'image-3.jpg', caption: 'Conductor <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2014'},
      {src: 'image-4.jpg', caption: 'Death.Mask.of.Beethovan <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
      {src: 'image-5.jpg', caption: 'Portrait.of.Leah <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2016'},
      {src: 'image-6.jpg', caption: 'Portrait.of.May <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
      {src: 'image-7.jpg', caption: 'Portrait.of.Patrick <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2025'},
      {src: 'image-8.jpg', caption: 'Study.of.a.Kazakh.lady <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
      {src: 'image-9.jpg', caption: 'Study.of.Philine <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
      {src: 'image-10.jpg', caption: 'Trista.in.Squares <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
      {src: 'image-11.jpg', caption: 'WingedVictory <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
    ];
    this.data = [
      {x: 71, y: 58, w: 400, h: 270},
      {x: 211, y: 255, w: 540, h: 360},
      {x: 631, y: 158, w: 400, h: 270},
      {x: 1191, y: 245, w: 260, h: 195},
      {x: 351, y: 687, w: 260, h: 290},
      {x: 751, y: 824, w: 205, h: 154},
      {x: 911, y: 540, w: 260, h: 350},
      {x: 1051, y: 803, w: 400, h: 300},
      {x: 71, y: 922, w: 350, h: 260},
      {x: 1451, y: 687, w: 300, h: 200},
      {x: 451, y: 1187, w: 280, h: 190},
    ]
    new InfiniteGrid({
      el: document.querySelector('#images'),
      sources: this.sources,
      data: this.data,
      originalSize: {w: 1522, h: 1238},
    })
  }
  resize() {
    document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`);
  }
}
window.addEventListener('load', () => {
  new Index();
});