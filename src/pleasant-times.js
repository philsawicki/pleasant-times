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
     * Rainbox emoji.
     */
    const RAINBOW = String.fromCodePoint(0x1F308);

    /**
     * Delay (in ms) during which to wait for before triggering the processing
     * of DOM scan, after page load or interaction with UI/UX elements.
     */
    const PROCESS_TRIGGER_DELAY = 2 * 1000;

    /**
     * Delay (in ms) during which to wait for the throttling or window and
     * document events, in order to maintain a smooth experience.
     */
    const THROTTLE_DELAY = PROCESS_TRIGGER_DELAY;

    /**
     * Timeout ID for the scroll throttling.
     */
    let scrollThrottlingID = -1;

    /**
     * Timeout ID for the resize throttling.
     */
    let resizeThrottingID = -1;

    /**
     * General bad movies.
     */
    const BAD_MOVIE_IDS = [
        80121840, // The Emoji Movie
        80994294, // Daphne & Velma
    ];

    /**
     * Terrible Adam Sandler movies.
     */
    const ADAM_SANDLER_MOVIE_IDS = [
        70140922, // Just Go With it
        70125231, // Grown Ups
        80242619, // Murder Mystery
        70267242, // Grown Ups 2
        70021637, // The Longest Yard
        70220030, // That's My Boy
        70202139, // Jack & Jill
        60033311, // 50 First Dates
        80063265, // The Do-Over
        80990663, // Uncut Gems
        80183328, // The Week Of
        21303955, // Big Daddy
        70041162, // Click
        70087541, // You Don't Mess with the Zohan
        80039517, // The Ridiculous 6
        80126569, // Sandy Wexler
        80037476, // Pixels
        60027583, // Anger Management
        80224536, // ADAM SANDLER 100% FRESH
        80174434, // The Meyerowitz Stories (New and Selected)
        70220028, // Hotel Transylvania
        80048061, // Hotel Transylvania 2
    ];

    /**
     * Terrible Dax Sheppard movies.
     */
    const DAX_SHEPPARD_MOVIE_IDS = [
        70051671, // Employee of the Month
        70047098, // Let's Go to Prison
    ];

    /**
     * Terrible Owen Wilson movies,
     */
    const OWEN_WILSON_MOVIE_IDS = [
        70140914, // Hall Pass
        80108180, // Father Figures
        70021650, // Wedding Crashers
        70138790, // How Do You Know
        80147986, // Wonder
        70271959, // Masterminds
         1153328, // Anaconda
    ];

    /**
     * Terrible Vince Vaughn movies.
     */
    const VINCE_VAUGHN_MOVIE_IDS = [
        70021650, // Wedding Crashers
        70099614, // Four Christmases
        60033343, // Anchorman
        80108975, // Hacksaw Ridge
        80028732, // F is for Family
        70140914, // Hall Pass
        70167067, // Horrible Bosses
    ];

    /**
     * Terrible Jack Black movies.
     */
    const JACK_BLACK_MOVIE_IDS = [
        70112729, // Year One
        80173395, // The Polka King
        60004022, // Saving Silverman
        80049939, // Goosebumps
        80192646, // Jumanji: Welcome to the Jungle
          342807, // The Cable Guy
        70045854, // The Holiday
        70075480, // Kung Fu Panda
        70126574, // Kung Fu Panda 2
        60029032, // Melvin Goes to Dinner
        70002007, // Shark Tale
        70241791, // DreamWorks Kung Fu Panda Awesome Secrets
        80101096, // Kung Fu Panda: Secrets of the Scroll
        70253397, // Kung Fu Panda: Holiday
        80039517, // The Ridiculous 6
    ];

    /**
     * Terrible Eddie Murphy movies.
     */
    const EDDIE_MURPHY_MOVIE_IDS = [
        80182014, // Dolemite Is My Name
          391018, // Coming to America
        70059700, // Eddie Murphy: Delirious
        21060556, // Life
        60000892, // The Nutty Professor II: The Klumps
        60034572, // Shrek 2
        70047102, // Shrek the Third
        70242630, // DreamWorks Shrek's Swamp Stories
        70117295, // Shrek Forever After
        70221348, // DreamWorks Holiday Classics
        70242143, // DreamWorks Shrek the Halls
    ];

    /**
     * Terrible Melissa McCarthy movies.
     */
    const MELISSA_MCCARTHY_MOVIE_IDS = [
        80220612, // Life of the Party
        80238651, // The Happytime Murders
        80080514, // Ghostbusters
        70123923, // The Back-Up Plan
        70155618, // Gilmore Girls
        60025063, // The Life of David Gale
        80109415, // Gilmore Girls: A Year in the Life
        80194950, // Wine Country
        80220496, // I Feel Pretty
    ];

    /**
     * Terrible Jim Carrey movies.
     */
    const JIM_CARREY_MOVIE_IDS = [
        70021643, // Fun with Dick & Jane
        70100379, // Yes Man
          342807, // The Cable Guy
        60034545, // Eternal Sunshine of the Spotless Mind
        80209608, // Jim & Andy: The Great Beyond - Featuring a Very Special, Contractually Obligated Mention of Tony Clifton
          215309, // Ace Ventura: Pet Detective
        11819086, // The Truman Show
        80099204, // The Bad Batch
        60000901, // How the Grinch Stole Christmas
    ];

    /**
     * Terrible Kevin Hart movies.
     */
    const KEVIN_HART_MOVIE_IDS = [
        80174687, // Kevin Hart: Irresponsible
        70140322, // Kevin Hart: Seriously Funny
        80106743, // Kevin Hart: What Now?
        70270773, // Kevin Hart: Let Me Explain
        70211216, // Kevin Hart: Laugh at My Pain
        80013275, // The Wedding Ringer
        70111504, // Kevin Hart: I'm a Grown Little Man
        70218677, // Think Like a Man
        80192646, // Jumanji: Welcome to the Jungle
        80231156, // Kevin Hart's Guide to Black History
        70118780, // Death at a Funeral
        60031248, // Scary Movie 3
        80160689, // Captain Underpants: The First Epic Movie
        81010817, // Kevin Hart: Don’t F**k This Up
        70082270, // First Sunday
        70125231, // Grown Ups
    ];

    /**
     * Terrible Cameron Diaz movies.
     */
    const CAMERON_DIAZ_MOVIE_IDS = [
        70141587, // Bad Teacher
        60022057, // The Sweetest Thing
        70045854, // The Holiday
        70113003, // My Sister's Keeper
         1154359, // My Best Friend's Wedding
        70117699, // The Green Hornet
        60034572, // Shrek 2
        70047102, // Shrek the Third
        70242630, // DreamWorks Shrek's Swamp Stories
        70117295, // Shrek Forever After
        70221348, // DreamWorks Holiday Classics
        70242143, // DreamWorks Shrek the Halls
    ];

    /**
     * Terrible Will Forte movies.
     */
    const WILL_FORTE_MOVIE_IDS = [
        80107084, // A Futile and Stupid Gesture
        80039517, // The Ridiculous 6
        70220030, // That's My Boy
        80986854, // I Think You Should Leave with Tim Robinson
        80151370, // Michael Bolton's Big, Sexy Valentine's Day Special
        70113007, // Cloudy with a Chance of Meatballs
        70273612, // Cloudy with a Chance of Meatballs 2
    ];

    /**
     * Terrible Andy Samberg movies.
     */
    const ANDY_SAMBERG_MOVIE_IDS = [
        70281562, // Brooklyn Nine-Nine
        70220030, // That's My Boy
        70058022, // Hot Rod
        70167075, // Friends with Benefits
        80091341, // Cuckoo
        70220028, // Hotel Transylvania
        80048061, // Hotel Transylvania 2
        81036190, // The Lonely Island Presents: The Unauthorized Bash Brothers Experience
        80100936, // Take the 10
        80986854, // I Think You Should Leave with Tim Robinson
        70113007, // Cloudy with a Chance of Meatballs
        70273612, // Cloudy with a Chance of Meatballs 2
        80148535, // The Dark Crystal: Age of Resistance
        80151370, // Michael Bolton's Big, Sexy Valentine's Day Special
        80046193, // Lady Dynamite
    ];

    /**
     * Terrible Adam Devine movies.
     */
    const ADAM_DEVINE_MOVIE_IDS = [
        80993404, // Adam Devine: Best Time of Our Lives
        80117531, // When We First Met
        80169617, // Game Over, Man!
        80057250, // Green Eggs and Ham
    ];

    /**
     * Terrible Isla Fisher movies.
     */
    const ISLA_FISHER_MOVE_IDS = [
        70243464, // Now You See Me
        70075478, // Definitely, Maybe
        70021650, // Wedding Crashers
        70058022, // Hot Rod
        80079256, // The Brothers Grimsby
        70243449, // Rise of the Guardians
        70137742, // Rango
    ];

    /**
     * Terrible Jennifer Aniston movies.
     */
    const JENNIFER_ANISTON_MOVIE_IDS = [
        80242619, // Murder Mystery
        70140922, // Just Go With it
        80201490, // Dumplin'
        70128696, // The Bounty Hunter
        70202146, // Wanderlust
        60033294, // Along Came Polly
        70097581, // He's Just Not That Into You
        70167067, // Horrible Bosses
        70153404, // Friends
        80170991, // The Yellow Birds
    ];

    /**
     * Terrible Katherine Heigl movies.
     */
    const KATHERINE_HEIGL_MOVIE_IDS = [
        70131764, // Life as We Know It
        70205463, // One for the Money
        70103759, // The Ugly Truth
        70120086, // Killers
        70140391, // Grey's Anatomy
        70189048, // New Year's Eve
        70195800, // Suits
    ];

    /**
     * Terrible Kevin James movies.
     */
    const KEVIN_JAMES_MOVIE_IDS = [
        80091658, // True Memoirs of an International Assassin
        80158976, // Kevin James: Never Don't Give Up
        70217915, // Here Comes The Boom: Ça Va Faire Boom
        60031404, // Kevin James: Sweat the Small Stuff
        70109689, // Paul Blart: Mall Cop
        70125231, // Grown Ups
        70267242, // Grown Ups 2
        80037476, // Pixels
        80126569, // Sandy Wexler
        70019506, // Hitch
        70220028, // Hotel Transylvania
        80048061, // Hotel Transylvania 2
        70044595, // Monster House
        80063265, // The Do-Over
        70140922, // Just Go With it
        70202139, // Jack & Jill
        80242619, // Murder Mystery
        70220030, // That's My Boy
        70021637, // The Longest Yard
        80039517, // The Ridiculous 6
    ];

    /**
     * Terrible Martin Short movies.
     */
    const MARTIN_SHORT_MOVIE_IDS = [
        80186850, // Steve Martin and Martin Short: An Evening You Will Forget for the Rest of Your Life
    ];

    /**
     * Terrible Dana Carvey movies.
     */
    const DANA_CARVEY_MOVIE_IDS = [
        80117461, // Dana Carvey: Straight White Male, 60
        18171022, // The Prince of Egypt
        70180293, // The Cat in the Hat Knows a Lot About That!
        70216224, // Madagascar 3: Europe's Most Wanted
    ];

    /**
     * Terrible Seann William Scott movies.
     */
    const SEANN_WILLIAM_SCOTT_MOVIE_IDS = [
        80163263, // Goon: Last of the Enforcers
        81164660, // Bloodline
        60004471, // Evolution
    ];

    /**
     * Terrible Mike Myers movies.
     */
    const MIKE_MYERS_MOVIE_IDS = [
         1153656, // Austin Powers: International Man of Mystery
        60031264, // Dr. Seuss' The Cat in the Hat
        80171455, // Terminal
        60034572, // Shrek 2
        70047102, // Shrek the Third
        70242630, // DreamWorks Shrek's Swamp Stories
        70117295, // Shrek Forever After
        70221348, // DreamWorks Holiday Classics
        70242143, // DreamWorks Shrek the Halls
        70218316, // DreamWorks Spooky Stories
        80236470, // Monty Python: The Meaning of Live
    ];

    /**
     * Terrible Rob Schneider movies.
     */
    const ROB_SCHNEIDER_MOVIE_IDS = [
        80074503, // Real Rob
        80039517, // The Ridiculous 6
        70125231, // Grown Ups
        70267242, // Grown Ups 2
        70087541, // You Don't Mess with the Zohan
        60033311, // 50 First Dates
        80126569, // Sandy Wexler
        21303955, // Big Daddy
        70021637, // The Longest Yard
        80185070, // Father of the Year
        70220030, // That's My Boy
        70047098, // Let's Go to Prison
        60034587, // White Chicks
        80063265, // The Do-Over
        70041162, // Click
        70202139, // Jack & Jill
        70112729, // Year One
        70140922, // Just Go With it
    ];

    /**
     * List of all the terrible shows to filter out.
     */
    const TERRIBLE_MOVIE_IDS = new Set([
        ...BAD_MOVIE_IDS,
        ...ADAM_SANDLER_MOVIE_IDS,
        ...DAX_SHEPPARD_MOVIE_IDS,
        ...OWEN_WILSON_MOVIE_IDS,
        ...VINCE_VAUGHN_MOVIE_IDS,
        ...JACK_BLACK_MOVIE_IDS,
        ...EDDIE_MURPHY_MOVIE_IDS,
        ...MELISSA_MCCARTHY_MOVIE_IDS,
        ...JIM_CARREY_MOVIE_IDS,
        ...KEVIN_HART_MOVIE_IDS,
        ...CAMERON_DIAZ_MOVIE_IDS,
        ...WILL_FORTE_MOVIE_IDS,
        ...ANDY_SAMBERG_MOVIE_IDS,
        ...ADAM_DEVINE_MOVIE_IDS,
        ...ISLA_FISHER_MOVE_IDS,
        ...JENNIFER_ANISTON_MOVIE_IDS,
        ...KATHERINE_HEIGL_MOVIE_IDS,
        ...KEVIN_JAMES_MOVIE_IDS,
        ...DANA_CARVEY_MOVIE_IDS,
        ...MARTIN_SHORT_MOVIE_IDS,
        ...SEANN_WILLIAM_SCOTT_MOVIE_IDS,
        ...MIKE_MYERS_MOVIE_IDS,
        ...ROB_SCHNEIDER_MOVIE_IDS,
    ]);


    /**
     * Delay scroll callbacks in order to maintain a smooth experience.
     *
     * @param {Function} callback Callback to execute at the given interval.
     * @param {number} delay Interval between successive executions of the
     * callback.
     */
    function throttleScroll(callback, delay) {
        if (scrollThrottlingID === -1) {
            scrollThrottlingID = setTimeout(() => {
                callback();
                scrollThrottlingID = -1;
            }, delay);
        }
    }

    /**
     * Delay resize callbacks in order to maintain a smooth experience.
     *
     * @param {Function} callback Callback to execute at the given interval.
     * @param {number} delay Interval between successive executions of the
     * callback.
     */
    function throttleResize(callback, delay) {
        if (resizeThrottingID === -1) {
            resizeThrottingID = setTimeout(() => {
                callback();
                resizeThrottingID = -1;
            }, delay);
        }
    }

    /**
     * Process the given slideshow tile.
     *
     * @param {HTMLDivElement} content Content Element.
     * @return {boolean} Flag indicating if the given element was successfully
     * processed.
     */
    function processTile(content) {
        const thumbnail = content.querySelector('img.boxart-image:not(.pleasant-times-blurred)');
        if (thumbnail !== null) {
            content.classList.add('pleasant-times-blurred');

            const fallbackTextElement = content.querySelector('.fallback-text');
            if (fallbackTextElement !== null) {
                fallbackTextElement.innerHTML =
                    `${RAINBOW}&nbsp;&nbsp;<span class="pleasant-times-striketrough">${fallbackTextElement.innerText}</span>`;
            }

            // Disable pointer events on the slide item, so the "bob" preview
            // does not open for disabled shows:
            const sliderItem = content.closest('.slider-item');
            if (sliderItem !== null) {
                sliderItem.classList.add('pleasant-times-disable-pointer-events');
            }

            return true;
        }

        return false;
    }

    /**
     * Process movies displayed on the current page.
     */
    function processContent() {
        let elementsProcessedCounter = 0;

        for (const showID of TERRIBLE_MOVIE_IDS.values()) {
            const contentElements = document.querySelectorAll(`.ptrack-content[data-ui-tracking-context*="%22video_id%22:${showID}"]:not(.pleasant-times-blurred)`);
            for (const contentElement of Array.from(contentElements)) {
                if (processTile(contentElement)) {
                    ++elementsProcessedCounter;
                }
            }
        }

        if (elementsProcessedCounter > 0) {
            recordBlockedContent(elementsProcessedCounter);
        }
    }

    /**
     * Register DOM event listener.
     */
    function registerEventListener() {
        // Delay-trigger the page processing:
        const trigger = () => {
            setTimeout(processContent, PROCESS_TRIGGER_DELAY);
        };

        trigger();

        const searchInput = document.querySelector('.searchInput input');
        if (searchInput !== null) {
            searchInput.addEventListener('keypress', trigger);
        }

        document.addEventListener('click', function (e) {
            for (let target = e.target; target && target != this; target = target.parentNode) {
                if (target.matches('.handleNext')
                        || target.matches('.handlePrev')
                        || target.matches('.suggestionRailContainer ul li')
                        || target.matches('ul.tabbed-primary-navigation li')) {
                    trigger();
                    break;
                }
            }
        }, false);

        window.addEventListener('scroll', () => {
            throttleScroll(processContent, THROTTLE_DELAY);
        });

        window.addEventListener('resize', () => {
            throttleResize(processContent, THROTTLE_DELAY);
        });
    }

    /**
     * Increment the count of shows that were blocked.
     *
     * @param {number} nbElementsProcessed Number of elements processed.
     * @return {Promise<number>} A Promise to be fulfilled once the number of
     * shows to block has been updated.
     */
    function recordBlockedContent(nbElementsProcessed) {
        const BLOCKED_SHOWS_KEY = 'blockedShows';

        chrome.storage.sync.get(BLOCKED_SHOWS_KEY, ({ blockedShows }) => {
            const newlockedShowsCounter = blockedShows + nbElementsProcessed;
            chrome.storage.sync.set({ [BLOCKED_SHOWS_KEY]: newlockedShowsCounter });
        });
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
        onDOMReady(registerEventListener);
    })();
})();
