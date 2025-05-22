import { after } from 'next/server';
import { WorkflowApprovalData } from '@/types/workflowApproval';
import { processWorkflowApproval } from '@/utils/workflow-approval/processWorkflowApproval';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WorkflowApprovalData;

    after(async () => {
      await processWorkflowApproval(body);
    });

    return Response.json({ success: 'Request sent to process endpoint' });
  } catch (error) {
    console.error('Error in workflow-approval route:', error);
    return Response.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
