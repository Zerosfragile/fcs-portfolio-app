"use server";
import { PostHog } from "posthog-node";

const internal_client = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY as string
  // { host: "https://webhook.site/c8f1af97-13b1-4dd1-bd77-18fd73f3b146" }
);

export const flushServerEvents = () => internal_client.flushAsync();

type TRPCEventProps = {
  userID?: string;
  organization?: string;
  appID: string;
};

type VALID_SERVER_EVENTS = {
  navigated_to_project: {
    url: string;
    projectID: string;
  };
  navigation_tracker: {
    url: string;
    type: "tracking";
  };
};

export const logServerEvent = async <T extends keyof VALID_SERVER_EVENTS>(
  event: T,
  payload: { distinctID: string; properties: VALID_SERVER_EVENTS[T] }
) => {
  console.log(payload);
  internal_client.capture({
    distinctId: payload.distinctID,
    event,
    properties: payload.properties,
  });
};

export const serverTestEvent = async () => {
  console.log("test event log called");
  internal_client.capture({
    distinctId: "test-id",
    event: "test-event",
  });
};

flushServerEvents();
