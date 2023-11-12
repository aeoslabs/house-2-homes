import { NotEnoughCreditsError } from './custom-errors';

export const postClient = async (
    path: string,
    body: any,
    delaySuccessSeconds: number = 0
): Promise<Response> => {
    const response = await fetch(`/api/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        },
        body: JSON.stringify(body)
    });

    if (response.ok && delaySuccessSeconds > 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, delaySuccessSeconds * 1000);
        });
    }

    if (response.status === 402) {
        throw new NotEnoughCreditsError("You don't have enough credits");
    }

    return response;
};

export const putClient = async (
    path: string,
    body: any,
    delaySuccessSeconds: number = 0
): Promise<Response> => {
    const response = await fetch(`/api/${path}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        },
        body: JSON.stringify(body)
    });

    if (response.ok && delaySuccessSeconds > 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, delaySuccessSeconds * 1000);
        });
    }

    if (response.status === 402) {
        throw new NotEnoughCreditsError("You don't have enough credits");
    }

    return response;
};

export const loadFont = async (fontFamily: string) => {
    const font = new FontFace(fontFamily, `url(/fonts/${fontFamily}.ttf)`);
    try {
        await font.load();
        document.fonts.add(font);
        return name;
    } catch {
        return null;
    }
};

export const throttleFunction = (func: Function, delayInMs: number) => {
    let lastCalled = 0;
    let delay = delayInMs;

    return (...args: any[]) => {
        const now = Date.now();
        if (lastCalled === 0) {
            func(...args);
            lastCalled = now;
        } else if (now - lastCalled > delay) {
            func(...args);
            lastCalled = now;
        }
    };
};

