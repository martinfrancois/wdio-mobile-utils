/**
 * @internal
 */
let SCREEN_SIZE: WebDriver.RectReturn | undefined;

/**
 * @category Gesture
 */
export type Coordinate = { x: number; y: number };

/**
 * These values are percentages of the screen.
 * @internal
 */
const SWIPE_DIRECTION = {
    down: {
        start: { x: 50, y: 15 },
        end: { x: 50, y: 85 },
    },
    left: {
        start: { x: 95, y: 50 },
        end: { x: 5, y: 50 },
    },
    right: {
        start: { x: 5, y: 50 },
        end: { x: 95, y: 50 },
    },
    up: {
        start: { x: 50, y: 85 },
        end: { x: 50, y: 15 },
    },
};

/**
 * @internal
 */
const CORNER_OFFSET = 50;

/**
 * Calculates the x y coordinates based on a percentage.
 * @param coordinate from which to calculate the percentage of
 * @param {number} percentage to scale the coordinate
 * @return {Coordinate} which was scaled by the percentage
 * @author Wim Selles | wswebcreation
 * @internal
 */
function calculateXY(coordinate: Coordinate, percentage: number): Coordinate {
    return {
        x: coordinate.x * percentage,
        y: coordinate.y * percentage,
    };
}

/**
 * Gets the screen coordinates based on a device's screen size.
 * @param {number} screenSize the size of the screen
 * @param {Coordinate} coordinate like { x: 50, y: 50 }
 * @return {Coordinate} based on the screen size
 * @author Wim Selles | wswebcreation
 * @internal
 */
function getDeviceScreenCoordinates(
    screenSize: WebDriver.RectReturn,
    coordinate: Coordinate
): Coordinate {
    return {
        x: Math.round(screenSize.width * (coordinate.x / 100)),
        y: Math.round(screenSize.height * (coordinate.y / 100)),
    };
}

/**
 * Swipes from coordinate (from) to the new coordinate (to).
 * The given coordinates are in pixels.
 *
 * @param {Coordinate} from like for example { x: 50, y: 50 }
 * @param {Coordinate} to like for example { x: 25, y: 25 }
 * @author Wim Selles | wswebcreation
 *
 * ### Example
 * ```js
 * // This is a swipe to the left
 * const from = { x: 50, y:50 }
 * const to = { x: 25, y:50 }
 * ```
 * @category Gesture
 */
export function swipe(from: Coordinate, to: Coordinate): void {
    browser.touchPerform([
        {
            action: 'press',
            options: from,
        },
        {
            action: 'wait',
            options: { ms: 1000 },
        },
        {
            action: 'moveTo',
            options: to,
        },
        {
            action: 'release',
        },
    ]);
    browser.pause(1000);
}

/**
 * Swipes from coordinate (from) to the new coordinate (to).
 * The given coordinates are percentages of the screen.
 *
 * @param {Coordinate} from like for example { x: 50, y: 50 }
 * @param {Coordinate} to like for example { x: 25, y: 25 }
 * @author Wim Selles | wswebcreation
 *
 * ### Example
 * ```js
 * // This is a swipe to the left
 * const from = { x: 50, y:50 }
 * const to = { x: 25, y:50 }
 * ```
 * @category Gesture
 */
export function swipeOnPercentage(from: Coordinate, to: Coordinate): void {
    SCREEN_SIZE = SCREEN_SIZE || browser.getWindowRect();
    const pressOptions = getDeviceScreenCoordinates(SCREEN_SIZE, from);
    const moveToScreenCoordinates = getDeviceScreenCoordinates(SCREEN_SIZE, to);
    swipe(pressOptions, moveToScreenCoordinates);
}

/**
 * Swipes up based on a percentage.
 * @param {number} percentage between 0 and 1
 * @author Wim Selles | wswebcreation
 * @category Gesture
 */
export function swipeUp(percentage = 1): void {
    swipeOnPercentage(
        calculateXY(SWIPE_DIRECTION.up.start, percentage),
        calculateXY(SWIPE_DIRECTION.up.end, percentage)
    );
}

/**
 * Check if an element is visible and if not scroll down a portion of the screen to
 * check if it visible after a x amount of scrolls.
 *
 * @param element to check for if displayed
 * @param {number} maxScrolls maximum amount of scrolls to perform until the element is visible
 * @param {number} amount current amount of scrolls
 * @author Wim Selles | wswebcreation
 * @category Gesture
 */
export function checkIfDisplayedWithScrollDown(
    element: WebdriverIO.Element,
    maxScrolls: number,
    amount = 0
): void {
    if (
        (!element.isExisting() || !element.isDisplayed()) &&
        amount <= maxScrolls
    ) {
        swipeUp(0.85);
        checkIfDisplayedWithScrollDown(element, maxScrolls, amount + 1);
    } else if (amount > maxScrolls) {
        throw new Error(
            `The element '${element}' could not be found or is not visible.`
        );
    }
}

/**
 * Swipe down based on a percentage.
 * @param {number} percentage between 0 and 1
 * @author Wim Selles | wswebcreation
 * @category Gesture
 */
export function swipeDown(percentage = 1): void {
    swipeOnPercentage(
        calculateXY(SWIPE_DIRECTION.down.start, percentage),
        calculateXY(SWIPE_DIRECTION.down.end, percentage)
    );
}

/**
 * Swipes left based on a percentage.
 * @param {number} percentage between 0 and 1
 * @author Wim Selles | wswebcreation
 * @category Gesture
 */
export function swipeLeft(percentage = 1): void {
    swipeOnPercentage(
        calculateXY(SWIPE_DIRECTION.left.start, percentage),
        calculateXY(SWIPE_DIRECTION.left.end, percentage)
    );
}

/**
 * Swipes right based on a percentage.
 * @param {number} percentage between 0 and 1
 * @author Wim Selles | wswebcreation
 * @category Gesture
 */
export function swipeRight(percentage = 1): void {
    swipeOnPercentage(
        calculateXY(SWIPE_DIRECTION.right.start, percentage),
        calculateXY(SWIPE_DIRECTION.right.end, percentage)
    );
}

/**
 * Calculates the horizontal offset for the swipe based on the element's width.
 * @param element to take as a reference for the width
 * @internal
 */
function calculateHorizontalSwipeOffset(element: WebdriverIO.Element): number {
    return element.getSize().width / 2;
}

/**
 * Swipes right on the {@code element}.
 * @param element to be swiped on
 * @category Gesture
 */
export function swipeRightOnElement(element: WebdriverIO.Element): void {
    /**
     * X and Y are at the corners of the element's bounds.
     * We need to move inside of the element in order to be able to swipe afterwards.
     */
    const positionX = element.getLocation().x + CORNER_OFFSET;
    const positionY = element.getLocation().y + CORNER_OFFSET;

    const from = { x: positionX, y: positionY };
    const to = {
        x: positionX + calculateHorizontalSwipeOffset(element),
        y: positionY,
    };

    swipe(from, to);
}

/**
 * Swipes left on the {@code element}.
 * @param element to be swiped on
 * @category Gesture
 */
export function swipeLeftOnElement(element: WebdriverIO.Element): void {
    /**
     * X and Y are at the corners of the element's bounds.
     * We need to move inside of the element in order to be able to swipe afterwards.
     */
    const positionX = element.getSize().width - CORNER_OFFSET;
    const positionY = element.getLocation().y + CORNER_OFFSET;

    const from = { x: positionX, y: positionY };
    const to = {
        x: positionX - calculateHorizontalSwipeOffset(element),
        y: positionY,
    };

    swipe(from, to);
}
