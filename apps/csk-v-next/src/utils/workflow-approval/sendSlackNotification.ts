'use server';

import { WorkflowApprovalData } from '@/types/workflowApproval';

type SendSlackNotificationProps = WorkflowApprovalData & {
  latestVersionScreenshotUrl: string;
  latestPublishedVersionScreenshotUrl: string;
  latestVersionPreviewUrl: string;
  latestPublishedVersionPreviewUrl: string;
  diffUrl: string;
  changesDescription: string;
};

const sendSlackNotification = async ({
  entity,
  initiator,
  timestamp,
  latestVersionScreenshotUrl,
  latestVersionPreviewUrl,
  diffUrl,
  changesDescription = 'No description provided',
}: SendSlackNotificationProps) => {
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  if (!process.env.SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not set');
    return;
  }

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${initiator.name} requested review on the ${entity.name} composition on ${formattedDate}`,
          emoji: true,
        },
      },
      { type: 'divider' },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📝 What changed*\n${changesDescription}`,
        },
      },
      { type: 'divider' },
      { type: 'section', text: { type: 'mrkdwn', text: '*🖼️ Screenshot*' } },
      {
        type: 'image',
        image_url: latestVersionScreenshotUrl,
        alt_text: 'Published Version',
      },
      { type: 'divider' },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*👀 Direct preview links*',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '🔺 Visual changes' },
            url: diffUrl,
            style: 'primary',
          },
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '👁️ Preview' },
            url: latestVersionPreviewUrl,
            style: 'primary',
          },
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '✏️ Open Editor' },
            url: entity.url,
            style: 'primary',
          },
        ],
      },
      { type: 'divider' },
    ],
  };

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(message),
  });
};

export default sendSlackNotification;
