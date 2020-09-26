import { Component, OnInit } from '@angular/core';
import { RatingDto } from 'src/common/models/RatingDto.class';
import { ApiService } from 'src/services/api.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    ratings: RatingDto[] = [];
    activeRating: RatingDto = null;
    status: string = "Root";
    prevStepsStack: RatingDto[] = [];

    constructor (private _apiService: ApiService) { }

    ngOnInit () {
        this.loadRootRatings();
    }

    loadRootRatings () {
        this._apiService.getAll().subscribe(ratings => {
            this.ratings = ratings.filter(r => r.parentId === null);
            console.log(this.ratings);
        });
    }

    loadRating(rating: RatingDto) {
        this._apiService.getChildren(rating.id).subscribe(data => {
            rating.children = data.map(child => {
                child.parent = rating;
                return child;
            })
        });

        this.activeRating = rating;
        this.status = rating.title;
    }

    goUp() {
        this.activeRating = this.activeRating?.parent || null;
        this.status = this.activeRating?.title || "Root";
    }


}
