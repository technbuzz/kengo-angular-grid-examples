import { Component } from '@angular/core';
import { filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { sampleProducts } from './products';
import { FilterService } from '@progress/kendo-angular-grid';
import { Product, Category } from './model';

const distinctCategories = (data: Product[]): Category[] => {
  const categories = data.reduce((map: Map<number, Category>, product: Product) =>
    // @ts-ignore
    map.set(product.CategoryID, product.Category),
    new Map()
  );

  return Array.from(categories.values());
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kendo-grid';
  public filter!: CompositeFilterDescriptor;
  public gridData: Product[] = sampleProducts;
  public categories: Category[] = distinctCategories(sampleProducts);

  public viewFilter = {
    product: '',
    category: ''
  }

  productChange(event: Event, filter: CompositeFilterDescriptor, filterService: FilterService) {
    const inputEl = event.target as HTMLInputElement
    filterService.filter({
      filters: [{
        field: 'ProductName',
        operator: 'eq',
        value: inputEl.value
      }],
      logic: 'or'
    })
  }


  catChange(event: any, filterService: FilterService) {
    filterService.filter({
      filters: [{
        field: 'CategoryID',
        operator: 'eq',
        value: event.value
      }],
      logic: 'or'
    })
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridData = filterBy(sampleProducts, filter);
  }



  public categoryChange(values: string[], filterService: FilterService): void {

    filterService.filter({
      filters: values.map(value => ({
        field: 'CategoryID',
        operator: 'eq',
        value
      })),
      logic: 'or'
    });
  }
}
