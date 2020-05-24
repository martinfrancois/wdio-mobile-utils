import { Selector } from './selector';
import { Type } from './type';
import {
    COMBINATION_SELECTOR_NULL_ERROR,
    SELECTOR_NULL_ERROR,
} from '../internal/utils';
import {
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
    IosSelector,
} from './iosSelector';
import {
    ANDROID_UISELECTOR_PROPERTIES,
    AndroidSelector,
} from './androidSelector';

describe('Selector', function () {
    const VALUE = 'TEST VALUE';

    const anyIosSelector = IosSelector.of(
        IOS_PREDICATE_ATTRIBUTES.NAME,
        IOS_PREDICATE_COMPARATOR.CONTAINS,
        ''
    );
    const anyAndroidSelector = AndroidSelector.of(
        ANDROID_UISELECTOR_PROPERTIES.CLASS_NAME,
        ''
    );

    const nullSelectorAndroid = Selector.custom(null, anyIosSelector);
    const nullSelectorIos = Selector.custom(anyAndroidSelector, null);

    describe('combination selectors', function () {
        const s1 = Selector.type(Type.TEXT_FIELD);
        const s2 = Selector.text(VALUE);
        const s3 = Selector.type(Type.BUTTON);
        const s4 = Selector.enabled();

        describe('and', function () {
            const combined = Selector.and(s1, s2);

            it('should return the selector for Android when "._android()" is called', function () {
                expect(combined._android()).toBe(
                    `.className("android.widget.EditText").text("${VALUE}")`
                );
            });

            it('should return the selector for iOS when "._ios()" is called', function () {
                expect(combined._ios()).toBe(
                    `(type == 'XCUIElementTypeTextField' && label == '${VALUE}')`
                );
            });

            it('should have an iOS selector of null when combining a selector with one that has an iOS selector of null', function () {
                const combined = Selector.and(s1, nullSelectorIos);

                expect(combined._ios()).toBeNull();
            });

            it('should have an Android selector of null when combining a selector with one that has an Android selector of null', function () {
                const combined = Selector.and(nullSelectorAndroid, s1);

                expect(combined._android()).toBeNull();
            });

            it('should throw an error if a selector with null on Android is combined with one that is null on iOS', function () {
                expect(() =>
                    Selector.and(nullSelectorAndroid, nullSelectorIos)
                ).toThrowError(COMBINATION_SELECTOR_NULL_ERROR);
            });
        });

        describe('or', function () {
            const combined = Selector.or(s1, s2);

            it('should return the selector for Android when "._android()" is called', function () {
                expect(combined._android()).toBe(
                    `.className("android.widget.EditText");new UiSelector().text("${VALUE}")`
                );
            });

            it('should return the selector for iOS when "._ios()" is called', function () {
                expect(combined._ios()).toBe(
                    `(type == 'XCUIElementTypeTextField' || label == '${VALUE}')`
                );
            });

            it('should have an iOS selector of null when combining a selector with one that has an iOS selector of null', function () {
                const combined = Selector.or(s1, nullSelectorIos);

                expect(combined._ios()).toBeNull();
            });

            it('should have an Android selector of null when combining a selector with one that has an Android selector of null', function () {
                const combined = Selector.or(nullSelectorAndroid, s1);

                expect(combined._android()).toBeNull();
            });

            it('should throw an error if a selector with null on Android is combined with one that is null on iOS', function () {
                expect(() =>
                    Selector.or(nullSelectorAndroid, nullSelectorIos)
                ).toThrowError(COMBINATION_SELECTOR_NULL_ERROR);
            });
        });

        describe('and & or', function () {
            const combined = Selector.and(Selector.or(s1, s3), s2);
            /**
             * (s1 || s3) && s2
             * is equivalent to
             * (s1 && s2) || (s3 && s2)
             */
            it('should return the selector for Android when "._android()" is called', function () {
                expect(combined._android()).toBe(
                    `.className("android.widget.EditText").text("${VALUE}");new UiSelector().className("android.widget.Button").text("${VALUE}")`
                );
            });

            it('should return the selector for iOS when "._ios()" is called', function () {
                expect(combined._ios()).toBe(
                    `((type == 'XCUIElementTypeTextField' || type == 'XCUIElementTypeButton') && label == '${VALUE}')`
                );
            });
        });

        describe('or & and', function () {
            const combined = Selector.or(Selector.and(s1, s3), s2);

            it('should return the selector for Android when "._android()" is called', function () {
                expect(combined._android()).toBe(
                    `.className("android.widget.EditText").className("android.widget.Button");new UiSelector().text("${VALUE}")`
                );
            });

            it('should return the selector for iOS when "._ios()" is called', function () {
                expect(combined._ios()).toBe(
                    `((type == 'XCUIElementTypeTextField' && type == 'XCUIElementTypeButton') || label == '${VALUE}')`
                );
            });
        });

        describe('combinations edge cases for Android', function () {
            /**
             * s2 && (s1 || s3)
             * is equivalent to
             * (s2 && s1) || (s2 && s3)
             */
            it('s2 && (s1 || s3) => (s2 && s1) || (s2 && s3)', function () {
                const combined = Selector.and(s2, Selector.or(s1, s3));
                expect(combined._android()).toBe(
                    `.text("${VALUE}").className("android.widget.EditText");new UiSelector().text("${VALUE}").className("android.widget.Button")`
                );
            });

            /**
             *  (s1 || s2) && (s3 || s4)
             * is equivalent to
             * (s1 && s3) || (s1 && s4) || (s2 && s3) || (s2 && s4)
             */
            it('(s1 || s2) && (s3 || s4) => (s1 && s3) || (s1 && s4) || (s2 && s3) || (s2 && s4)', function () {
                const combined = Selector.and(
                    Selector.or(s1, s2),
                    Selector.or(s3, s4)
                );
                expect(combined._android()).toBe(
                    '.className("android.widget.EditText").className("android.widget.Button");' + // (s1 && s3) ||
                    'new UiSelector().className("android.widget.EditText").enabled(true);' + // (s1 && s4) ||
                    `new UiSelector().text("${VALUE}").className("android.widget.Button");` + // (s2 && s3) ||
                        `new UiSelector().text("${VALUE}").enabled(true)` // (s2 && s4)
                );
            });

            it('(s1 && s2) || (s3 && s4)', function () {
                const combined = Selector.or(
                    Selector.and(s1, s2),
                    Selector.and(s3, s4)
                );
                expect(combined._android()).toBe(
                    `.className("android.widget.EditText").text("${VALUE}");` + // (s1 && s2) ||
                        'new UiSelector().className("android.widget.Button").enabled(true)' // (s3 && s4)
                );
            });

            it('multiple levels of nested AND and OR conditions', function () {
                const combined = Selector.and(
                    Selector.or(
                        Selector.or(Selector.and(s1, s2), Selector.or(s1, s2)),
                        Selector.and(Selector.and(s1, s2), Selector.or(s1, s2))
                    ),
                    Selector.or(
                        Selector.or(Selector.and(s1, s2), Selector.or(s1, s2)),
                        Selector.and(Selector.and(s1, s2), Selector.or(s1, s2))
                    )
                );
                expect(combined._android()).toBe(
                    `.className("android.widget.EditText").text("${VALUE}");new UiSelector().className("android.widget.EditText");new UiSelector().text("${VALUE}");new UiSelector().className("android.widget.EditText").text("${VALUE}").className("android.widget.EditText");new UiSelector().className("android.widget.EditText").text("${VALUE}").text("${VALUE}").className("android.widget.EditText").text("${VALUE}");new UiSelector().className("android.widget.EditText");new UiSelector().text("${VALUE}");new UiSelector().className("android.widget.EditText").text("${VALUE}").className("android.widget.EditText");new UiSelector().className("android.widget.EditText").text("${VALUE}").text("${VALUE}")`
                );
            });
        });
    });

    describe('type', function () {
        it.each`
            type               | androidClassName             | iosType
            ${Type.LABEL}      | ${'android.widget.TextView'} | ${'XCUIElementTypeStaticText'}
            ${Type.BUTTON}     | ${'android.widget.Button'}   | ${'XCUIElementTypeButton'}
            ${Type.TEXT_FIELD} | ${'android.widget.EditText'} | ${'XCUIElementTypeTextField'}
        `(
            'should return type selector with className "$androidClassName" for Android and type "$iosType" for iOS for enum type "$type"',
            ({ type, androidClassName, iosType }) => {
                const selector = Selector.type(type);
                expect(selector._android()).toBe(
                    `.className("${androidClassName}")`
                );
                expect(selector._ios()).toBe(`type == '${iosType}'`);
            }
        );

        it('should throw an exception if the type is not implemented', function () {
            expect(() =>
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore to force a non-existing type
                Selector.type('awdawjife434637863787h8tefwef')
            ).toThrowError('Type not implemented!');
        });
    });

    describe('text', function () {
        const selector = Selector.text(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(`.text("${VALUE}")`);
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`label == '${VALUE}'`);
        });
    });
    describe('textContains', function () {
        const selector = Selector.textContains(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(`.textContains("${VALUE}")`);
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`label CONTAINS '${VALUE}'`);
        });
    });
    describe('textMatches', function () {
        const selector = Selector.textMatches(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(`.textMatches("${VALUE}")`);
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`label MATCHES '${VALUE}'`);
        });
    });
    describe('textStartsWith', function () {
        const selector = Selector.textStartsWith(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(`.textStartsWith("${VALUE}")`);
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`label BEGINSWITH '${VALUE}'`);
        });
    });

    describe('accessibilityId', function () {
        const selector = Selector.accessibilityId(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(`.description("${VALUE}")`);
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`name == '${VALUE}'`);
        });
    });
    describe('accessibilityIdContains', function () {
        const selector = Selector.accessibilityIdContains(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(
                `.descriptionContains("${VALUE}")`
            );
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`name CONTAINS '${VALUE}'`);
        });
    });
    describe('accessibilityIdMatches', function () {
        const selector = Selector.accessibilityIdMatches(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(`.descriptionMatches("${VALUE}")`);
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`name MATCHES '${VALUE}'`);
        });
    });
    describe('accessibilityIdStartsWith', function () {
        const selector = Selector.accessibilityIdStartsWith(VALUE);

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe(
                `.descriptionStartsWith("${VALUE}")`
            );
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe(`name BEGINSWITH '${VALUE}'`);
        });
    });

    describe('enabled', function () {
        const selector = Selector.enabled();

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe('.enabled(true)');
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe('enabled == 1');
        });
    });
    describe('disabled', function () {
        const selector = Selector.disabled();

        it('should return the selector for Android when "._android()" is called', function () {
            expect(selector._android()).toBe('.enabled(false)');
        });

        it('should return the selector for iOS when "._ios()" is called', function () {
            expect(selector._ios()).toBe('enabled == 0');
        });
    });

    describe('custom', function () {
        it('should throw an error if the iOS and Android selector is null when creating a selector', function () {
            expect(() => Selector.custom(null, null)).toThrowError(
                SELECTOR_NULL_ERROR
            );
        });
    });
});
