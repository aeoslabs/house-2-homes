import logger from '@/logger';
import { RateLimitError } from './custom-errors';

const { REPLICATE_API_TOKEN } = process.env;

export const replicatePost = async (
    modelVersion: string,
    inputs: Record<string, any>,
    webhook?: {
        url: string;
        events: string[];
    }
) => {
    try {
        // throw rate limit error
        // throw new RateLimitError('Replicate rate limit error');
        const webhookUrl = webhook?.url;
        const webhookEvents = webhook?.events;
        const extra =
            webhookUrl && webhookEvents
                ? { webhook: webhookUrl, webhook_events_filter: webhookEvents }
                : {};

        const body = {
            version: modelVersion,
            input: {
                ...inputs
            },
            ...extra
        };

        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                Authorization: `Token ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        // throw rate limit error
        if (response.status === 429) {
            throw new RateLimitError('Replicate rate limit error');
        }

        if (response.status !== 201) {
            let error = (await response.json()) as { detail: string };
            throw new Error(error.detail);
        }

        const prediction = await response.json();

        return prediction;
    } catch (error) {
        logger.error({ error, inputs }, 'Replicate fetch error');
        throw error;
    }
};

type Prediction<T> = {
    status: 'start' | 'completed' | 'succeeded' | 'failed' | 'cancelled';
    output: T;
};

