import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FilterValuesPipe } from './filter-values.pipe';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { FilterValuePipe } from './filter-value.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilterValuesPipe,
    FilterValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GridModule,
    FormsModule,
    MultiSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
