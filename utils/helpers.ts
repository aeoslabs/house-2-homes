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

export const extractListAndConvertToCSV = (input: string): string[] => {
    const regex = /(?:"([^"]+)"|([^,\n]+))/g;

    const titles: string[] = input
        .split(/\n/)
        .flatMap((line: string) => {
            const listMatches = line.match(/(\d+\.\s*(?:"[^"]+"|[^\s,]+))/g);
            if (listMatches) {
                return listMatches.map((entry) => {
                    const titleMatch = entry.match(/\d+\.\s*(?:"(.+?)"|(.+))/);
                    if (titleMatch && (titleMatch[1] || titleMatch[2])) {
                        return titleMatch[1] || titleMatch[2];
                    } else {
                        return '';
                    }
                });
            } else {
                const lineMatches: string[] = [];
                let match;
                while ((match = regex.exec(line)) !== null) {
                    lineMatches.push(match[1] || match[2]);
                }
                return lineMatches;
            }
        })
        .filter((title: string | any[]) => title.length > 0);

    return titles;
};

export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

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
