import {
    ANDROID_UISELECTOR_PROPERTIES,
    AndroidSelector,
} from './androidSelector';
import {
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
    IosSelector,
} from './iosSelector';
import { Type } from './type';
import logger from '@wdio/logger';
import {
    ANDROID_SELECTOR_NULL_ERROR,
    IOS_SELECTOR_NULL_ERROR,
    SELECTOR_NULL_ERROR,
} from '../internal/utils';

const log = logger('Selector');

export class Selector {
    private androidSelector: string | null;
    private iosSelector: string | null;

    private constructor(
        androidSelector: string | null,
        iosSelector: string | null
    ) {
        this.androidSelector = androidSelector;
        this.iosSelector = iosSelector;
    }

    public static and(selector1: Selector, selector2: Selector): Selector {
        const andAndroid = this.combineAndAndroid(selector1, selector2);
        const andIos = '(' + selector1.ios() + ' && ' + selector2.ios() + ')';
        return new Selector(andAndroid, andIos);
    }

    private static combineAndAndroid(
        selector1: Selector,
        selector2: Selector
    ): string {
        const splitOr = ';new UiSelector()';
        const split1 = selector1.android().split(splitOr);
        const split2 = selector2.android().split(splitOr);
        if (split1.length == 1 && split2.length == 1) {
            // standard case, individual selectors were not combined with an "or" condition before
            return split1[0] + split2[0];
        } else if (split1.length == 2 && split2.length == 1) {
            /**
             * When there is an AND condition in a nested OR condition, we have to transform the boolean expression
             * to only use AND conditions in the parentheses and connect them together using OR conditions
             * since UiSelector's can only be OR combined by a semicolon, which will not take into account any grouping.
             */

            /**
             * (s1 || s3) && s2
             * is equivalent to
             * (s1 && s2) || (s3 && s2)
             */
            const s1 = split1[0];
            const s2 = split2[0];
            const s3 = split1[1];
            return this.combineOrAndroid(s1 + s2, s3 + s2);
        } else if (split1.length == 1 && split2.length == 2) {
            /**
             * s2 && (s1 || s3)
             * is equivalent to
             * (s2 && s1) || (s2 && s3)
             */
            const s1 = split2[0];
            const s2 = split1[0];
            const s3 = split2[1];
            return this.combineOrAndroid(s2 + s1, s2 + s3);
        } else if (split1.length == 2 && split2.length == 2) {
            /**
             *  (s1 || s2) && (s3 || s4)
             * is equivalent to
             * (s1 && s3) || (s1 && s4) || (s2 && s3) || (s2 && s4)
             */
            const s1 = split1[0];
            const s2 = split1[1];
            const s3 = split2[0];
            const s4 = split2[1];
            const part1 = this.combineOrAndroid(s1 + s3, s1 + s4); // (s1 && s3) || (s1 && s4)
            const part2 = this.combineOrAndroid(s2 + s3, s2 + s4); // (s2 && s3) || (s2 && s4)
            return this.combineOrAndroid(part1, part2);
        } else {
            /**
             * Here we have multiple levels of nested OR conditions with multiple levels of nested AND conditions.
             * These cases should be very rare and if they occur, it may be better to use a different approach in such a case anyways.
             * So we don't handle them but log an error to warn the user.
             */
            log.error(
                'Using multiple levels of nested OR conditions together with AND conditions can cause unexpected results on Android, please re-write the expression to only use OR conditions between the AND conditions.'
            );
            return selector1.android() + selector2.android();
        }
    }

    public static or(selector1: Selector, selector2: Selector): Selector {
        const andAndroid = this.combineOrAndroid(
            selector1.android(),
            selector2.android()
        );
        const andIos = '(' + selector1.ios() + ' || ' + selector2.ios() + ')';
        return new Selector(andAndroid, andIos);
    }

    private static combineOrAndroid(selector1: string, selector2: string) {
        return selector1 + ';new UiSelector()' + selector2;
    }

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
            IosSelector.of(
                IOS_PREDICATE_ATTRIBUTES.TYPE,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                iosType
            )
        );
    }

    public static text(text: string): Selector {
        return this.custom(
            AndroidSelector.android(ANDROID_UISELECTOR_PROPERTIES.TEXT, text),
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
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
            IosSelector.of(
                IOS_PREDICATE_ATTRIBUTES.ENABLED,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                0
            )
        );
    }

    /**
     * Allows building a custom selector for Android and iOS.
     * @note One of the parameters {@code android} or {@code ios} may be null, in case a selector only needs to be used on one specific platform.
     * @param android the custom selector to be used on Android
     * @param ios the custom selector to be used on iOS
     */
    public static custom<T, U>(
        android: AndroidSelector<T> | null,
        ios: IosSelector<U> | null
    ): Selector {
        if (android == null && ios == null) {
            throw new Error(SELECTOR_NULL_ERROR);
        }

        let androidSelector: string | null = null;
        let iosSelector: string | null = null;
        if (android) {
            androidSelector = android.toString();
        }
        if (ios) {
            iosSelector = ios.toString();
        }
        return new Selector(androidSelector, iosSelector);
    }

    public android() {
        if (!this.androidSelector) {
            throw new Error(ANDROID_SELECTOR_NULL_ERROR);
        }
        return this.androidSelector;
    }

    public ios() {
        if (!this.iosSelector) {
            throw new Error(IOS_SELECTOR_NULL_ERROR);
        }
        return this.iosSelector;
    }
}
