export class DateAndContentDTO {
    constructor();
    constructor(
        public orderIds?: number[],
        public dateAfter?: string,
        public dateBefore?: string,
        public content?: string
    ) {}
}
