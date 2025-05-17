import { Steps } from 'antd';
import React from 'react';
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';

const StepProgress = ({ direction, record, allSteps }) => {

  const getStepStatus = (index, currentIndex, latestStepHasOutTime) => {
    if (latestStepHasOutTime) {
      // If latest step has out time, that step is finished, so process moves to next step
      if (index < currentIndex ) return 'finish';
      if (index === currentIndex ) return 'process';
      return 'wait';
    } else {
      // Latest step does NOT have out time, so that step is in process
      if (index < currentIndex) return 'finish';
      if (index === currentIndex) return 'process';
      return 'wait';
    }
  };

  const getStepIcon = (status) => {
    if (status === 'process') return <LoadingOutlined style={{ fontSize: '16px', color: '#1890ff' }} />;
    if (status === 'finish') return <CheckCircleFilled style={{ fontSize: '16px', color: 'green' }} />;
    return <div style={{ width: 16, height: 16 }} />; // Empty placeholder to keep space
  };


  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const calculateDuration = (inTimeStr, outTimeStr) => {
    if (!inTimeStr || !outTimeStr) return '';
    const inTime = new Date(inTimeStr);
    const outTime = new Date(outTimeStr);
    if (isNaN(inTime) || isNaN(outTime) || outTime < inTime) return '';

    const diffMs = outTime - inTime;
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
  };

  const statusArray = record.statuses || [];
  const latestStep = statusArray.at(-1);
  const latestStepName = latestStep?.step || '';
  const currentStepIndex = allSteps.findIndex(
    (step) => step.toLowerCase() === latestStepName.toLowerCase()
  );

  // Check if latest step has an 'out' time to mark as finished
  const latestStepHasOutTime = latestStep && latestStep.out;

  const steps = allSteps.map((step, index) => {
    const title = step
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const status = getStepStatus(index, currentStepIndex, latestStepHasOutTime);
    const icon = getStepIcon(status);

    const matchedStatus = statusArray.find(
      (s) => s.step.toLowerCase() === step.toLowerCase()
    );

    let description = '';
    if (matchedStatus) {
      const inTimeFormatted = formatDateTime(matchedStatus.in);
      const outTimeFormatted = formatDateTime(matchedStatus.out);
      const duration = calculateDuration(matchedStatus.in, matchedStatus.out);

      description = `In: ${inTimeFormatted}`;
      if (outTimeFormatted) description += ` | Out: ${outTimeFormatted}`;
      if (duration) description += ` | Duration: ${duration}`;
    }

    return { title, status, icon, description };
  });

  return (
    <Steps direction={direction} className="custom-steps" items={steps} />
  );
};

export default StepProgress;
