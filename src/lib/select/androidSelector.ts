import { removeStartingTilde } from '../utils';
import { isString } from '../internal/utils';

// see https://developer.android.com/reference/androidx/test/uiautomator/UiSelector
export enum ANDROID_UISELECTOR_PROPERTIES {
    CHECKABLE = 'checkable',
    CHECKED = 'checked',
    CLASS_NAME = 'className',
    CLASS_NAME_MATCHES = 'classNameMatches',
    CLICKABLE = 'clickable',
    DESCRIPTION = 'description',
    DESCRIPTION_CONTAINS = 'descriptionContains',
    DESCRIPTION_MATCHES = 'descriptionMatches',
    DESCRIPTION_STARTS_WITH = 'descriptionStartsWith',
    ENABLED = 'enabled',
    FOCUSABLE = 'focusable',
    FOCUSED = 'focused',
    FROM_PARENT = 'fromParent',
    INDEX = 'index',
    INSTANCE = 'instance',
    LONG_CLICKABLE = 'longClickable',
    PACKAGE_NAME = 'packageName',
    PACKAGE_NAME_MATCHES = 'packageNameMatches',
    RESOURCE_ID = 'resourceId',
    RESOURCE_ID_MATCHES = 'resourceIdMatches',
    SCROLLABLE = 'scrollable',
    SELECTED = 'selected',
    TEXT = 'text',
    TEXT_CONTAINS = 'textContains',
    TEXT_MATCHES = 'textMatches',
    TEXT_STARTS_WITH = 'textStartsWith',
}

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
