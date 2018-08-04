import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

import { MaterialModule } from "./material.module";
import { FilterItemDirective } from "./filter-item.directive";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, FilterItemDirective],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
