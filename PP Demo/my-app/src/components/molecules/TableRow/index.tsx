import { TableRow as MuiTableRow } from '@mui/material';
import TableCell from '../../atoms/TableCell';

interface Props {
  row: {
    name: string;
    status: string;
    preNotice: string;
    postNotice: string;
  };
}

const TableRow = ({ row }: Props) => {
  return (
    <MuiTableRow hover>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.preNotice}</TableCell>
      <TableCell>{row.postNotice}</TableCell>
    </MuiTableRow>
  );
};

export default TableRow;
