import { TableCell } from '@mui/material';

interface Props {
  label: string;
}

const TableHeading = ({ label }: Props) => {
  return <TableCell>{label}</TableCell>;
};

export default TableHeading;
