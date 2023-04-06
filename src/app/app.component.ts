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
  template: `
       <kendo-grid style="padding: 4rem"
                [data]="gridData"
                [filter]="filter"
                filterable="menu"
                (filterChange)="filterChange($event)"
                [height]="400"
            >
            <kendo-grid-column field="ProductName" title="Product Name">
            <ng-template kendoGridFilterMenuTemplate
            let-column="column"
            let-filter="filter"
            let-filterService="filterService"
            >
           <mat-form-field>
              <input matInput placeholder="Product Name" [(ngModel)]="viewFilter.product" (keyup)="productChange($event, filter, filterService)">
            </mat-form-field>         
          </ng-template>
  
            </kendo-grid-column>
            <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="130" format="{0:c}" filter="numeric">
            </kendo-grid-column>
            <kendo-grid-column field="CategoryID" title="Category" [width]="180">
                <ng-template kendoGridFilterMenuTemplate
                    let-column="column"
                    let-filter="filter"
                    let-filterService="filterService"
                    >
                    <mat-radio-group [value]="filter | filterValue" aria-label="Select an option" (change)="catChange($event, filterService)" >
                      <p> <mat-radio-button value="1">Beverages</mat-radio-button> </p>
                      <p><mat-radio-button value="2">Condiments</mat-radio-button></p>
                    </mat-radio-group>
                    <!-- <kendo-multiselect -->
                    <!--     style="width: 220px" -->
                    <!--     [data]="categories" -->
                    <!--     textField="CategoryName" -->
                    <!--     valueField="CategoryID" -->
                    <!--     [valuePrimitive]="true" -->
                    <!--     [value]="filter | filterValues" -->
                    <!--     (valueChange)="categoryChange($event, filterService)" -->
                    <!--     > -->
                    <!-- </kendo-multiselect> -->
                </ng-template>
                <ng-template kendoGridCellTemplate let-dataItem>
                    {{dataItem.Category?.CategoryName}}
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="Discontinued" [width]="160" filter="boolean">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
                </ng-template>
            </kendo-grid-column>
        </kendo-grid>
`,
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
