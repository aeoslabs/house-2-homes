export const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
};

export const toDateTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
    t.setSeconds(secs);
    return t;
};

export const fileToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // The result includes the content type of the file e.g. "data:image/png;base64,...."
            // If you only want the Base64 string, you can split the result as follows:

            resolve(reader.result);
        };
        reader.onerror = (err) => {
            reject(err);
        };
    });
};

export const debounce = (
    func: (...args: any[]) => void,
    wait: number | undefined
) => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            // @ts-ignore
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export function getKeyByValue(
    object: Record<string, any>,
    value: any
): string | null {
    for (const [key, val] of Object.entries(object)) {
        if (val === value) {
            return key;
        }
    }
    return null;
}

export const isUpperCase = (s: string) => /^[A-Z]*$/.test(s);

export const getImageMeta = (url: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
    });
};


export function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}