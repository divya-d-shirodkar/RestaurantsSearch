import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../services/restaurants/restaurants.service';
import { Restaurant } from '../models/restaurants';
import { Sort } from "../models/sort";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  restaurantsList: Restaurant[];
  sortList: Sort[] = [
    {
      "value": 0,
      "viewValue": "Rating"
    },
    {
      "value": 1,
      "viewValue": "Delivery Time"
    }
  ];

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    //get all restaurants list
    this.restaurantsService.getRestaurants()
      .subscribe(restaurants => {
        this.restaurantsList = restaurants;
        this.restaurantsService.restaurantsList = restaurants;
      });
  }

  onSelectedFilter() {
    this.getFilteredRestaurantsList();
  }

  getFilteredRestaurantsList() {
    this.restaurantsList = [];
    if (this.restaurantsService.searchOptions.length > 0)
      this.restaurantsList = this.restaurantsService.filteredRestaurants();
    else {
      this.restaurantsList = this.restaurantsService.restaurantsList;
    }

  }

  sortRestaurants(event) {
    var sortInput = event.source.value;
    this.restaurantsList.sort(function(a, b) {
      if(sortInput == 0)
      return b.rating - a.rating;
      else 
      return b.deliveryTime - a.deliveryTime;
    });
    

  }


}
