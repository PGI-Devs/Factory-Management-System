import { Steps } from 'antd';
import React from 'react';
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';

const StepProgress = ({ record ,allSteps}) => {

  const getStepStatus = (index, currentIndex) => {
  if (index < currentIndex) return 'finish';
  if (index === currentIndex) return 'process';
  return 'wait';
};
  const getStepIcon = (status) => {
    if (status === 'process') return <LoadingOutlined />;
    return <CheckCircleFilled />;
  };

  const statusArray = record.statuses || [];
  const latestStep = statusArray.at(-1)?.step || '';
  const currentStepIndex = allSteps.findIndex(
    (step) => step.toLowerCase() === latestStep.toLowerCase()
  );

  const steps = allSteps.map((step, index) => {
    const title = step
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');

    const status = getStepStatus(index, currentStepIndex);
    const icon = getStepIcon(status);
// Find corresponding time for this step from statusArray
    const matchedStatus = statusArray.find(
      (s) => s.step.toLowerCase() === step.toLowerCase()
    );
    const description = matchedStatus?.time || '';

    return { title, status, icon,description  };
  });

  return <Steps className="custom-steps" items={steps} />;
};

export default StepProgress;
