import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridModule } from '@progress/kendo-angular-grid';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { FilterValuesPipe } from './filter-values.pipe';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    FilterValuesPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    FormsModule,
    MultiSelectModule
  ]
})
export class AppModule { }
