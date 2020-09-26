import { NgModule } from '@angular/core';
// import { RatingDto } from 'src/models/RatingDto.class';
import { ApiService } from '../services/api.service';

@NgModule({
    declarations: [
    ],
    imports: [],
    providers: [ApiService],
    bootstrap: [],
    exports: [
        ApiService
    ]
})
export class AppModule { }
