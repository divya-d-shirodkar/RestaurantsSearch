import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Restaurant } from "../../models/restaurants";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  searchOptions: any[] = [];
  restaurantsList: Restaurant[];
  url: string = 'assets/stubs/restaurantsLists.json'

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(this.url);

  }

  filteredRestaurants() {
    let restaurants = this.restaurantsList;
    let filteredRestaurantsList = [];
    for (let restaurant of restaurants) {
        for (let options of this.searchOptions) {
            if (options.name === restaurant.name) {
              filteredRestaurantsList.push(restaurant);
            }
        }
    }
    //console.log(filteredRestaurantsList);
    return filteredRestaurantsList;
  }

  

}
