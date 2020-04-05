/**!
 * Copyright (c) 2020 Philippe Sawicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(() => {
    'use strict';

    /**
     * Storage key for the number of shows blocked since the extension was
     * installed.
     */
    const BLOCKED_SHOWS_KEY = 'blockedShows';


    // Only enable the extension on the "netflix.com" domain:
    chrome.runtime.onInstalled.addListener(() => {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
            chrome.declarativeContent.onPageChanged.addRules([
                {
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: {
                                urlContains: 'netflix.com'
                            }
                        })
                    ],
                    actions: [
                        new chrome.declarativeContent.ShowPageAction()
                    ]
                }
            ]);
        });
    });

    // Initialize the number of shows blocked since the extension was installed:
    chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.sync.set({ [BLOCKED_SHOWS_KEY]: 0 }, () => {
            console.log('Installed application.');
        });
    });
})();
