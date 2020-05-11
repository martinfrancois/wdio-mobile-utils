/**
 * Removes, if present, the ~ character in the beginning of a string.
 * This is useful in cases where the accessibilityId can be passed in by the developer, but needs to be without a ~ in front. This makes
 * sure even if the accessibilityId contains a ~ that is not allowed, that it's properly removed, providing greater convenience.
 */
export function removeStartingTilde(key: string): string {
    if (key.startsWith('~')) {
        return key.substring(1); // cut off ~ in front
    } else {
        return key;
    }
}

/**
 * Returns the accessibilityId of an element.
 *
 * @param {WebdriverIO.Element} element of which to get the accessibilityId
 * @return {string} the accessibilityId of {@code element}
 */
export function getAccessibilityIdOfElement(
    element: WebdriverIO.Element
): string {
    if (browser.isAndroid) {
        return element.getAttribute('content-desc');
    } else {
        return element.getAttribute('label');
    }
}

/**
 * Get Safari URL.
 */
export function getSafariUrl(): WebdriverIO.Element {
    return $('~URL');
}
