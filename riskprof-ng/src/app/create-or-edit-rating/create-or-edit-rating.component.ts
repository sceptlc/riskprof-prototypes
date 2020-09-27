import { Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RatingDto } from 'src/common/models/RatingDto.class';
import { ApiService } from 'src/services/api.service';

@Component({
    selector: 'create-or-edit-rating',
    templateUrl: './create-or-edit-rating.component.html',
    styleUrls: ['./create-or-edit-rating.component.less']
})
export class CreateOrEditRatingComponent implements OnInit {

    rating: RatingDto;
    
    @Output() created: EventEmitter<RatingDto> = new EventEmitter<RatingDto>();
    @ViewChild("modalTemplate", { read: TemplateRef }) template: TemplateRef<any>;
    modalRef: NgbModalRef;
    isNewRating: boolean = false;

    constructor(private modalService: NgbModal, private _apiService: ApiService) { }

    ngOnInit(): void {
    }
    
    show(rating: RatingDto = null, parent: RatingDto = null) {
        if (!rating) {
            this.rating = new RatingDto();
            this.rating.parent = parent;
            this.rating.parentId = parent?.id;
            this.isNewRating = true;
        } else {
            this.rating = rating;
            this.isNewRating = false;
        }
        this.modalRef = this.modalService.open(this.template);
    }

    save () {
        if (this.isNewRating)
            this._apiService.create(this.rating).subscribe(createdRating => {
                if (createdRating.id) {
                    this.created.emit(createdRating);
                    this.close();
                } else {
                    alert("Произошла ошибка при создании рейтинга!");
                }
            });
        else 
            this._apiService.update(this.rating).subscribe(updatedRating => {
                this.close();
            });
    }

    close () {
        this.modalRef.close();
    }

}
