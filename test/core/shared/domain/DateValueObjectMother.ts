import {DateValueObject} from "../../../../src/core/shared/domain/DateValueObject";

const ANY_DATE = '01/01/2020';

export class DateValueObjectMother {
    static random(): DateValueObject {
        return DateValueObject.fromString(ANY_DATE);
    }
}
