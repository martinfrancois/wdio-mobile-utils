import {
    ANDROID_UISELECTOR_PROPERTIES,
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
} from '../utils';
import { AndroidSelector } from './androidSelector';
import { IosSelector } from './iosSelector';

export class Selector {
    private androidSelector: string;
    private iosSelector: string;

    private constructor(androidSelector: string, iosSelector: string) {
        this.androidSelector = androidSelector;
        this.iosSelector = iosSelector;
    }
    /*
    public static and(selector1: Selector, selector2: Selector): Selector {
        return new Selector('', '');
    }

    public static or(selector1: Selector, selector2: Selector): Selector {
        return new Selector('', '');
    }

    public static type(type: Type): Selector {
        return new Selector('', '');
    }

    public static text(text: string): Selector {
        return new Selector('', '');
    }
    public static textContains(text: string): Selector {
        return new Selector('', '');
    }
    public static textMatches(text: string): Selector {
        return new Selector('', '');
    }
    public static textStartsWith(text: string): Selector {
        return new Selector('', '');
    }

    public static accessibilityId(accessibilityId: string): Selector {
        return new Selector('', '');
    }
    public static accessibilityIdContains(accessibilityId: string): Selector {
        return new Selector('', '');
    }
    public static accessibilityIdMatches(accessibilityId: string): Selector {
        return new Selector('', '');
    }
    public static accessibilityIdStartsWith(accessibilityId: string): Selector {
        return new Selector('', '');
    }*/

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
