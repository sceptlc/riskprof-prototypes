
export class RatingDto {
    id: number;
    parentId: number;
    key: number;
    title: string;
    children: RatingDto[] = [];
    parent: RatingDto = null;

    constructor(obj: any) {
        this.id = obj['Id'];
        this.parentId = obj['ParentId'];
        this.title = obj['Title'];
        this.key = obj['Key'];
    }
}


