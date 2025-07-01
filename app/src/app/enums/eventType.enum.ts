export enum EventTypeEnum {
    ANNIVERSARY = 1,
    WEDDING,
    MEETING,
    PARTY
}

export class EventTypeEnumDescription {
    static description(type: number) {
        switch (type) {
            case EventTypeEnum.ANNIVERSARY:
                return "Aniversário";
            case EventTypeEnum.WEDDING:
                return "Casamento";
            case EventTypeEnum.MEETING:
                return "Reunião";
            case EventTypeEnum.PARTY:
                return "Festa";
            default:
                return "";
        }
    }
}
