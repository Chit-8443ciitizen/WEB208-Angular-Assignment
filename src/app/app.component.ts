import { Component } from '@angular/core';
import { Inventor } from './entities/inventor';
import { Product } from './product/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // bài 2
  title = 'FPT Polytechnic';
  student = {
    hoten: 'Lê Văn Tèo',
    gioitinh: 'Nam',
    ngaysinh: '04/06/1998',
    anh: 'https://i.imgur.com/bbnrc1T.png',
    diemTB: 8.9,
  };
  // bài 3
  inventors: Inventor[] = [
    {
      id: 1,
      first: 'Albert',
      last: 'Einstein',
      year: 1879,
      passed: 1955,
    },
    {
      id: 2,
      first: 'Isaac',
      last: 'Newton',
      year: 1643,
      passed: 1727,
    },
    {
      id: 3,
      first: 'Galileo',
      last: 'Galilei',
      year: 1564,
      passed: 1642,
    },
    {
      id: 4,
      first: 'Marie',
      last: 'Curie',
      year: 1867,
      passed: 1934,
    },
    {
      id: 5,
      first: 'Johannes',
      last: 'Kepler',
      year: 1571,
      passed: 1630,
    },
    {
      id: 6,
      first: 'Nicolaus',
      last: 'Coprticus',
      year: 1473,
      passed: 1543,
    },
  ];

  show(innerHTML: string) {
    const inventorElement = document.querySelector('#inventor');
    if (inventorElement) {
      inventorElement.innerHTML = innerHTML;
    }
  }

  render(callback: (innerHTML: string) => void) {
    let innerHTML = this.inventors
      .map((inventor) => {
        return `<tr>
        <td>${inventor.id}</td>
        <td>${inventor.first}</td>
        <td>${inventor.last}</td>
        <td>${inventor.year}</td>
        <td>${inventor.passed}</td>
      </tr>`;
      })
      .join('');
    callback(innerHTML);
  }

  // bài 4

  products: Product[] = [
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2016',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
    },
    {
      productId: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2016',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
    },
    {
      productId: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2016',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
    },
    {
      productId: 8,
      productName: 'Saw',
      productCode: 'TBX-0022',
      releaseDate: 'May 15, 2016',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      starRating: 3.7,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png',
    },
    {
      productId: 10,
      productName: 'Video Game Controller',
      productCode: 'GMG-0042',
      releaseDate: 'October 15, 2015',
      description: 'Standard two-button video game controller',
      price: 35.95,
      starRating: 4.6,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
    },
  ];

  showbai4(innerHTML: string) {
    const productElement = document.querySelector('#products');
    if (productElement) {
      productElement.innerHTML = innerHTML;
    }
  }

  renderbai4(callback: (innerHTML: string) => void) {
    let innerHTML = this.products
      .map((product, index) => {
        return `<tr key=${index}>
        <td><img width="70" src=${product.imageUrl} /></td>
        <td>${product.productName}</td>
        <td>${product.productCode}</td>
        <td>${product.releaseDate}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.starRating}</td>
      </tr>`;
      })
      .join('');
    callback(innerHTML);
  }
}
