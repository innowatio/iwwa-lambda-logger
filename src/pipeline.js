import log from "services/logger";

export default function pipeline(event, context) {

    try {

        event.Records.forEach(record => {
            if (record.kinesis && record.kinesis.data) {
                const streamName = record.eventSourceARN.split("/")[1];
                const {data} = record.kinesis;
                const encoded = new Buffer(data, "base64");
                const decoded = encoded.toString("utf8");
                const js = JSON.parse(decoded);
                log.info({...js, streamName}, "logged");
            }
        });

    } catch (error) {
        log.error(error);
    }

    // Never call context.fail we don't want to block the kinesis stream.
    context.succeed();
}
