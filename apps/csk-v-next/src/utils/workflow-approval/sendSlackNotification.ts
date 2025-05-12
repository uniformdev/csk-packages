'use server';

type SendSlackNotificationProps = {
  entityType: string;
  entity: {
    id: string;
    name: string;
    type: string;
    url: string;
  };
  initiator: {
    name: string;
    email: string;
  };
  newStage: {
    stageName: string;
    workflowName: string;
  };
  previousStage: {
    stageName: string;
  };
  timestamp: string;
  latestVersionScreenshotUrl: string;
  latestPublishedVersionScreenshotUrl: string;
  latestVersionPreviewUrl: string;
  latestPublishedVersionPreviewUrl: string;
  diffUrl: string;
  changesDescription: string;
};

const sendSlackNotification = async ({
  entityType,
  entity,
  initiator,
  newStage,
  previousStage,
  timestamp,
  latestVersionScreenshotUrl,
  latestPublishedVersionScreenshotUrl,
  latestVersionPreviewUrl,
  latestPublishedVersionPreviewUrl,
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
          text: `🔄 Workflow Update - ${initiator.name} requested review`,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `A new change was made to the workflow:\n\n*<${entity.url}|${entity.name}>*  •  _${entityType}_`,
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*From:*\n${previousStage.stageName}` },
          { type: 'mrkdwn', text: `*To:*\n${newStage.stageName}` },
          { type: 'mrkdwn', text: `*Workflow:*\n${newStage.workflowName}` },
          { type: 'mrkdwn', text: `*By:*\n${initiator.name || initiator.email}` },
          { type: 'mrkdwn', text: `*When:*\n${formattedDate}` },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '🔍 Open in Canvas' },
            url: entity.url,
            style: 'primary',
          },
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '📄 Versions Comparison' },
            url: diffUrl,
            style: 'primary',
          },
        ],
      },
      { type: 'divider' },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*📝 Preview links *',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '✅ Published Version' },
            url: latestPublishedVersionPreviewUrl,
            style: 'primary',
          },
          {
            type: 'button',
            text: { type: 'plain_text', emoji: true, text: '🆕 Latest Version' },
            url: latestVersionPreviewUrl,
            style: 'primary',
          },
        ],
      },
      { type: 'divider' },
      { type: 'section', text: { type: 'mrkdwn', text: '*🖼️ Visual Comparison*' } },
      {
        type: 'image',
        title: { type: 'plain_text', text: '📘 Published Version', emoji: true },
        image_url: latestPublishedVersionScreenshotUrl,
        alt_text: 'Published Version',
      },
      {
        type: 'image',
        title: { type: 'plain_text', text: '🆕 Latest Version', emoji: true },
        image_url: latestVersionScreenshotUrl,
        alt_text: 'Latest Version',
      },
      { type: 'divider' },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📝 Changes Description*\n${changesDescription}`,
        },
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
