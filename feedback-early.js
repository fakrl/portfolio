/* Starts fetching the guestbook as early as possible, before the (large) Firebase SDK has even downloaded.
   - cached copy from the last visit is available instantly (shown while the network answers)
   - one plain HTTPS request to the Realtime Database REST endpoint, in parallel with the SDK download
   The page scripts render from these first, then the live Firebase subscription takes over. */
(function () {
    var KEY = 'fb_feedback_v1';
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY)); } catch (_) {}
    var url = 'https://fakrul-feeeb-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json';
    window.__fbEarly = {
        key: KEY,
        cached: cached && typeof cached === 'object' ? cached : null,
        promise: fetch(url, { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
    };
})();
