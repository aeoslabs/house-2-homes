export class RateLimitError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RateLimitError';
    }
}

export class CreditUpdateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CreditUpdateError';
    }
}

export class NotEnoughCreditsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotEnoughCreditsError';
    }
}

export class OpenAIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'OpenAIError';
    }
}
