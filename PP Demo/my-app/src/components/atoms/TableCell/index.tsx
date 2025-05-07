import { TableCell as MuiTableCell } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
}

const TableCell = ({ children, align = 'left' }: Props) => {
  return <MuiTableCell align={align}>{children}</MuiTableCell>;
};

export default TableCell;
