import { Component, OnInit, ViewChild } from '@angular/core';
import { RatingDto } from 'src/common/models/RatingDto.class';
import { ApiService } from 'src/services/api.service';
import { CreateOrEditRatingComponent } from './create-or-edit-rating/create-or-edit-rating.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    ratings: RatingDto[] = [];
    activeRating: RatingDto = null;
    status: string = "Root";

    @ViewChild('createOrEditRating') createOrEditRating: CreateOrEditRatingComponent;

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

    createRating() {
        this.createOrEditRating.show(null, this.activeRating);
    }

    onNewRatingCreated(rating: RatingDto) {
        this.activeRating.children.push(rating);
    }

    editRating($event: any, rating: RatingDto) {
        $event.stopPropagation();
        this.createOrEditRating.show(rating);
    }

    deleteRating($event: any, ratingToDelete: RatingDto) {
        $event.stopPropagation();
        if (confirm("Удалить рейтинг " + ratingToDelete.title + "?")) {
            this._apiService.delete(ratingToDelete).subscribe(res => {
                if (ratingToDelete.parent)
                    ratingToDelete.parent.children
                         = ratingToDelete.parent.children.filter(r => r.id === ratingToDelete.id);
                else 
                    this.ratings.filter(r => r.id === ratingToDelete.id);
            });
        }
    }


}
