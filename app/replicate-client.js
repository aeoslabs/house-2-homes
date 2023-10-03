export const replicatePost = async (
  modelVersion,
  modelName,
  inputs,
  webhook
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
        ...inputs,
      },
      ...extra,
    };

    const response = await fetch(
      `https://api.replicate.com/v1/deployments/ctrhero/${modelName}/predictions`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // throw rate limit error
    if (response.status === 429) {
      throw new RateLimitError("Replicate rate limit error");
    }

    if (response.status !== 201) {
      let error = await response.json();
      throw new Error(error.detail);
    }

    const prediction = await response.json();

    return prediction;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
