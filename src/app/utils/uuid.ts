export class UUID {
    private static id: number = 0;

    public static getNext(): number {
        return ++this.id;
    }
}
