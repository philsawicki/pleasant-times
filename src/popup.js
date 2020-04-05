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


    /**
     * Register DOM event listeners.
     */
    function registerEventListeners() {
        // Initial number of shows blocked:
        chrome.storage.sync.get(BLOCKED_SHOWS_KEY, data => {
            showCounter(data[BLOCKED_SHOWS_KEY]);
        });

        // Register a callback for the number of shows blocked:
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (BLOCKED_SHOWS_KEY in changes) {
                const blockedShowCounter = changes[BLOCKED_SHOWS_KEY].newValue;
                showCounter(blockedShowCounter);
            }
        });
    }

    /**
     * Display the number of shows that have been blocked since the extension
     * was installed.
     *
     * @param {number} blockedShowCounter NUmber of shows blocked.
     */
    function showCounter(blockedShowCounter) {
        const counterElement = document.getElementById('blockedShowsCounter');
        if (counterElement !== null) {
            counterElement.innerText = blockedShowCounter.toLocaleString();
        }
    }

    /**
     * Execute the given function when the DOM is ready.
     *
     * @param {Function} callback The callback function to execute when the DOM
     * is ready.
     */
    function onDOMReady(callback) {
        if (document.readyState !== 'loading') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }


    /**
     * Bootstrap the application.
     */
    (() => {
        onDOMReady(registerEventListeners);
    })();
})();
