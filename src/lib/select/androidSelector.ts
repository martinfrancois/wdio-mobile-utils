import { ANDROID_UISELECTOR_PROPERTIES, removeStartingTilde } from '../utils';
import { isString } from '../internal/utils';

export class AndroidSelector<T> {
    private _property: ANDROID_UISELECTOR_PROPERTIES;
    private _value: T;

    private constructor(property: ANDROID_UISELECTOR_PROPERTIES, value: T) {
        this._property = property;
        this._value = value;
    }

    public static android<T>(
        property: ANDROID_UISELECTOR_PROPERTIES,
        value: T
    ): AndroidSelector<T> {
        return new AndroidSelector<T>(property, value);
    }

    get property(): ANDROID_UISELECTOR_PROPERTIES {
        return this._property;
    }

    get value(): T {
        return this._value;
    }

    toString(): string {
        let selector = '.' + this.property + '(';
        if (isString(this.value)) {
            selector +=
                '"' +
                removeStartingTilde((this.value as unknown) as string) +
                '")';
        } else {
            selector += this.value + ')';
        }
        return selector;
    }
}
