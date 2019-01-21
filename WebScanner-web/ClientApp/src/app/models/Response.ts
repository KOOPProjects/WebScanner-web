export class WebAppResponse {
    constructor();
    constructor(
        public id?: number,
        public orderId?: number,
        public date?: string,
        public content?: string,
        public type?: string
    ) {}
}
