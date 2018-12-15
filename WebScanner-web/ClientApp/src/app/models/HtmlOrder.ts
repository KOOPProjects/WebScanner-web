export class HtmlOrder {
    constructor();
    constructor(
        public id?: number,
        public frequency?: number,
        public targetAddress?: string,
        public subjectOfQuestion?: string
    ) {}
}
