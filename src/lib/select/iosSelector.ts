import {
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
    removeStartingTilde,
} from '../utils';
import { isString } from '../internal/utils';

export class IosSelector<T> {
    attribute: IOS_PREDICATE_ATTRIBUTES;
    comparator: IOS_PREDICATE_COMPARATOR;
    value: T;

    private constructor(
        attribute: IOS_PREDICATE_ATTRIBUTES,
        comparator: IOS_PREDICATE_COMPARATOR,
        value: T
    ) {
        this.attribute = attribute;
        this.comparator = comparator;
        this.value = value;
    }

    public static ios<T>(
        attribute: IOS_PREDICATE_ATTRIBUTES,
        comparator: IOS_PREDICATE_COMPARATOR,
        value: T
    ): IosSelector<T> {
        return new IosSelector<T>(attribute, comparator, value);
    }

    toString(): string {
        let selector = this.attribute + ' ' + this.comparator + ' ';
        if (isString(this.value)) {
            selector +=
                "'" +
                removeStartingTilde((this.value as unknown) as string) +
                "'";
        } else {
            selector += this.value;
        }
        return selector;
    }
}
