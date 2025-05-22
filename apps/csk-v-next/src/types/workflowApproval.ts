type Stage = {
    stageId: string;
    stageName: string;
    workflowId: string;
    workflowName: string;
  };
  
  export type WorkflowApprovalData = {
    entity: {
      id: string;
      name: string;
      type: string;
      url: string;
    };
    initiator: {
      email: string;
      id: string;
      is_api_key: boolean;
      name: string;
    };
    newStage: Stage;
    previousStage: Stage;
    project: {
      id: string;
      url: string;
    };
    timestamp: string;
  };
  