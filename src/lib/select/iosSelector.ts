import { removeStartingTilde } from '../utils';
import { isString } from '../internal/utils';

// see https://github.com/facebookarchive/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules
export enum IOS_PREDICATE_ATTRIBUTES {
    NAME = 'name',
    VALUE = 'value',
    LABEL = 'label',
    RECT = 'rect',
    TYPE = 'type',
    ENABLED = 'enabled',
    VISIBLE = 'visible',
    ACCESSIBLE = 'accessible',
    ACCESSIBILITY_CONTAINER = 'accessibilityContainer',
}

// see https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html
export enum IOS_PREDICATE_COMPARATOR {
    EQUALS = '==',
    NOT_EQUALS = '!=',
    CONTAINS = 'CONTAINS',
    BEGINS_WITH = 'BEGINSWITH',
    ENDS_WITH = 'ENDSWITH',
    LIKE = 'LIKE',
    MATCHES = 'MATCHES',
}

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
