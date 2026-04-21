(function () {
    const REMOTE_BACKEND = 'https://pbl-daa-1-1.onrender.com';
    const STORAGE_KEY = 'pbl_backend_url';

    function normalize(url) {
        if (!url || typeof url !== 'string') {
            return '';
        }
        return url.trim().replace(/\/$/, '');
    }

    function tryUrl(value) {
        const url = normalize(value);
        if (!url) {
            return '';
        }

        try {
            const parsed = new URL(url);
            return normalize(parsed.origin + parsed.pathname);
        } catch (_error) {
            return '';
        }
    }

    function getFromQuery() {
        const params = new URLSearchParams(window.location.search);
        return tryUrl(params.get('backend'));
    }

    function getLocalBackend() {
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return `${window.location.protocol}//${host}:5000`;
        }
        return '';
    }

    function isStaticHost(hostname) {
        return (
            hostname.includes('vercel.app') ||
            hostname.includes('netlify.app') ||
            hostname.includes('github.io')
        );
    }

    function getApiBaseUrl() {
        const runtimeOverride = tryUrl(window.__PBL_BACKEND_URL__);
        if (runtimeOverride) {
            return runtimeOverride;
        }

        const queryBackend = getFromQuery();
        if (queryBackend) {
            window.localStorage.setItem(STORAGE_KEY, queryBackend);
            return queryBackend;
        }

        const storedBackend = tryUrl(window.localStorage.getItem(STORAGE_KEY));
        if (storedBackend) {
            return storedBackend;
        }

        const localBackend = getLocalBackend();
        if (localBackend) {
            return localBackend;
        }

        if (!isStaticHost(window.location.hostname)) {
            return window.location.origin;
        }

        return REMOTE_BACKEND;
    }

    function getGoogleMapsApiKey() {
        const runtimeOverride = window.__PBL_GOOGLE_MAPS_API_KEY__;
        if (runtimeOverride && typeof runtimeOverride === 'string') {
            return runtimeOverride.trim();
        }

        const params = new URLSearchParams(window.location.search);
        const queryKey = params.get('google_maps_api_key');
        if (queryKey && typeof queryKey === 'string') {
            window.localStorage.setItem('pbl_google_maps_api_key', queryKey.trim());
            return queryKey.trim();
        }

        return (window.localStorage.getItem('pbl_google_maps_api_key') || '').trim();
    }

    function getRegion(paramRegion) {
        const params = new URLSearchParams(window.location.search);
        return params.get(paramRegion) || 'Uttarakhand';
    }

    window.PBL_CONFIG = {
        getApiBaseUrl,
        getRegion,
        getGoogleMapsApiKey,
        normalize
    };
})();
