
export class RatingDto {
    id: number;
    parentId: number;
    key: string;
    title: string;
    children: RatingDto[] = [];
    parent: RatingDto = null;

    constructor(obj: any = {}) {
        this.id = obj['Id'] || null;
        this.parentId = obj['ParentId'] || null;
        this.title = obj['Title'] || "";
        this.key = obj['Key'] || "";
    }
}


