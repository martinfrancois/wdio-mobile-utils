import {
    ANDROID_UISELECTOR_PROPERTIES,
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
} from '../utils';
import { AndroidSelector } from './androidSelector';
import { IosSelector } from './iosSelector';
import { Type } from './type';

export class Selector {
    private androidSelector: string;
    private iosSelector: string;

    private constructor(androidSelector: string, iosSelector: string) {
        this.androidSelector = androidSelector;
        this.iosSelector = iosSelector;
    }

    /* public static and(selector1: Selector, selector2: Selector): Selector {
        return new Selector('', '');
    }

    public static or(selector1: Selector, selector2: Selector): Selector {
        return new Selector('', '');
    }*/

    public static type(type: Type): Selector {
        let androidClassName;
        let iosType;

        switch (type) {
            case Type.LABEL:
                androidClassName = 'android.widget.TextView';
                iosType = 'XCUIElementTypeStaticText';
                break;
            case Type.BUTTON:
                androidClassName = 'android.widget.Button';
                iosType = 'XCUIElementTypeButton';
                break;
            case Type.TEXT_FIELD:
                androidClassName = 'android.widget.EditText';
                iosType = 'XCUIElementTypeTextField';
                break;
            default:
                throw new Error('Type not implemented!');
        }

        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.CLASS_NAME,
                androidClassName
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.TYPE,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                iosType
            )
        );
    }

    public static text(text: string): Selector {
        return this.custom(
            AndroidSelector.android(ANDROID_UISELECTOR_PROPERTIES.TEXT, text),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.LABEL,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                text
            )
        );
    }
    public static textContains(text: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.TEXT_CONTAINS,
                text
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.LABEL,
                IOS_PREDICATE_COMPARATOR.CONTAINS,
                text
            )
        );
    }
    public static textMatches(text: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.TEXT_MATCHES,
                text
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.LABEL,
                IOS_PREDICATE_COMPARATOR.MATCHES,
                text
            )
        );
    }
    public static textStartsWith(text: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.TEXT_STARTS_WITH,
                text
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.LABEL,
                IOS_PREDICATE_COMPARATOR.BEGINS_WITH,
                text
            )
        );
    }

    public static accessibilityId(accessibilityId: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.DESCRIPTION,
                accessibilityId
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.NAME,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                accessibilityId
            )
        );
    }
    public static accessibilityIdContains(accessibilityId: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.DESCRIPTION_CONTAINS,
                accessibilityId
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.NAME,
                IOS_PREDICATE_COMPARATOR.CONTAINS,
                accessibilityId
            )
        );
    }
    public static accessibilityIdMatches(accessibilityId: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.DESCRIPTION_MATCHES,
                accessibilityId
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.NAME,
                IOS_PREDICATE_COMPARATOR.MATCHES,
                accessibilityId
            )
        );
    }
    public static accessibilityIdStartsWith(accessibilityId: string): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.DESCRIPTION_STARTS_WITH,
                accessibilityId
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.NAME,
                IOS_PREDICATE_COMPARATOR.BEGINS_WITH,
                accessibilityId
            )
        );
    }

    public static enabled(): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.ENABLED,
                true
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.ENABLED,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                1
            )
        );
    }
    public static disabled(): Selector {
        return this.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.ENABLED,
                false
            ),
            IosSelector.ios(
                IOS_PREDICATE_ATTRIBUTES.ENABLED,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                0
            )
        );
    }

    public static custom<T, U>(
        android: AndroidSelector<T>,
        ios: IosSelector<U>
    ): Selector {
        return new Selector(android.toString(), ios.toString());
    }

    public android() {
        return this.androidSelector;
    }

    public ios() {
        return this.iosSelector;
    }
}
