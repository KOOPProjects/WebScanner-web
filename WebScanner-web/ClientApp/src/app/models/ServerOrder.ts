export class ServerOrder {
    constructor();
    constructor(
        public id?: number,
        public frequency?: number,
        public targetAddress?: string,
        public question?: string
    ) {}
}
