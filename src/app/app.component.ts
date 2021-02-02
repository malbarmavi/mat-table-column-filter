import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

const buildInfo: {
  commit: String;
  buildNo: numbre;
} = require("../../build-info.json");

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

export const CONDITIONS_LIST = [
  { value: "nono", label: "Nono" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
  { value: "is-equal", label: "Is equal" },
  { value: "is-not-equal", label: "Is not equal" },
];

export const CONDITIONS_FUNCTIONS = {
  // search method base on conditions list value
  "is-empty": function (value, filterdValue) {
    return value === "";
  },
  "is-not-empty": function (value, filterdValue) {
    return value !== "";
  },
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {
    return value != filterdValue;
  },
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};
  private _filterMethods = CONDITIONS_FUNCTIONS;

  constructor() {
    console.log(`${buildInfo.buildNo}-${buildInfo.commit}`);
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (p: PeriodicElement, filtre: any) => {
      let result = true;
      let keys = Object.keys(p); // keys of the object data

      for (const key of keys) {
        let searchCondition = filtre.conditions[key]; // get search filter method

        if (searchCondition && searchCondition !== "none") {
          if (
            filtre.methods[searchCondition](p[key], filtre.values[key]) ===
            false
          ) {
            // invoke search filter
            result = false; // if one of the filters method not succeed the row will be remove from the filter result
            break;
          }
        }
      }

      return result;
    };
  }

  applyFilter() {
    let searchFilter: any = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this._filterMethods,
    };

    this.dataSource.filter = searchFilter;
  }

  clearColumn(columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.applyFilter();
  }
}
