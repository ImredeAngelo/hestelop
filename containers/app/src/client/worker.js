import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NavigationRoute } from 'workbox-routing/NavigationRoute';
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    '/',
    new StaleWhileRevalidate({
        cacheName: 'short-cache-v1',
        matchOptions: {
            ignoreVary: true
        },
    })
)

self.addEventListener("push", function(event) {
    event.waitUntil(self.registration.showNotification(event.data.text()));
});

// Dev: Auto update service worker
if(process.env.NODE_ENV == "development") {
    self.addEventListener('message', event => {
        console.log("Updated service worker.");
        if (event.data && event.isTrusted && event.data.type === 'SKIP_WAITING') {
            self.skipWaiting();
        }
    });
}