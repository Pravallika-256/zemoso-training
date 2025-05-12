import { Chip } from '@mui/material';
import './style.css';

interface StatusChipProps {
  status: string;
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      label={status}
      className="status-chip"
      size="small"
    />
  );
};

export default StatusChip;
