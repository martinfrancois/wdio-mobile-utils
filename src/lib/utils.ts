/**
 * Removes, if present, the ~ character in the beginning of a string.
 * This is useful in cases where the automationText can be passed in by the developer, but needs to be without a ~ in front. This makes
 * sure even if the automationText contains a ~ that is not allowed, that it's properly removed, providing greater convenience.
 */
export function removeStartingTilde(key: string) {
    if (key.startsWith('~')) {
        return key.substring(1); // cut off ~ in front
    } else {
        return key;
    }
}

/**
 * Get the automation text of an element
 *
 * @param {element} element
 *
 * @return {string}
 */
export function getAutomationTextOfElement(element: WebdriverIO.Element) {
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
