const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

const registerValidServiceWorker = (swUrl: string, config?: Config) => {
  navigator.serviceWorker.register(swUrl).then((registration) => {
    // eslint-disable-next-line no-param-reassign
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else if (config && config.onSuccess) {
            config.onSuccess(registration);
          }
        }
      };
    };
  });
};

const checkValidServiceWorker = (swUrl: string, config?: Config) => {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  }).then((response) => {
    const contentType = response.headers.get("content-type");
    if (response.status === 404 || (contentType != null && contentType.indexOf("javascript") === -1)) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      registerValidServiceWorker(swUrl, config);
    }
  });
};

export const register = (config?: Config): null | void => {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = "./service-worker.js";

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          // eslint-disable-next-line no-console
          console.log("Service worker working on localhost");
        });
      } else {
        registerValidServiceWorker(swUrl, config);
      }
    });
  }
};

export const unregisterServiceWorker = (): void => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};
