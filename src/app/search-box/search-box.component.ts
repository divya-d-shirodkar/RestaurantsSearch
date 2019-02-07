import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RestaurantsService } from '../services/restaurants/restaurants.service';
import { Restaurant } from '../models/restaurants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  restaurantsList: Restaurant[];
  searchInput = new FormControl();
  autoCompleteList: any[];
  searchOptions = [];
  removable:boolean = true;

  @Output() onSelectedOptions = new EventEmitter();
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    //get all restaurants list
    this.restaurantsService.getRestaurants()
      .subscribe(restaurants => {
        this.restaurantsList = restaurants;
      });
  

  //when user types any input, the value changes will come through this
    this.searchInput.valueChanges.subscribe(input => {
      this.autoCompleteList = this._autoCompleteList(input);
    });

}

  private _autoCompleteList(searchInput: any) {
    if (typeof searchInput != "string") {
      return [];
    }
    if (searchInput === '' || searchInput === null) {
      return [];
    }
  
    return searchInput ? this.restaurantsList.filter(restaurant => restaurant.name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1)
      : this.restaurantsList;

    }


    displayName(restaurant: Restaurant | undefined) {
      return restaurant ? restaurant.name : undefined

    }

    filterRestaurantList(event) {
      let restaurant = event.source.value;
      if(!restaurant) {
        this.restaurantsService.searchOptions = [];
      } else {
        if (!this.restaurantsService.searchOptions.includes(restaurant)) this.restaurantsService.searchOptions.push(restaurant); this.searchOptions.push(restaurant);
        this.onSelectedOptions.emit(this.restaurantsService.searchOptions);
      }
      this.clearSearchInput();

    }

    removeSearchOption(option) {
      let index = this.restaurantsService.searchOptions.indexOf(option);
      if (index >= 0)
          this.restaurantsService.searchOptions.splice(index, 1);
          this.searchOptions.splice(index, 1);
      this.clearSearchInput();
      this.onSelectedOptions.emit(this.restaurantsService.searchOptions)
    }

    // Clear input box
    clearSearchInput() {
      this.autocompleteInput.nativeElement.value = '';
  }
    

}
