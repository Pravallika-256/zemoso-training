import { TableRow as MuiTableRow } from '@mui/material';
import TableCell from '../../atoms/TableCell';
import StatusChip from '../../atoms/StatusChip';

interface RowData {
  name: string;
  status: string;
  preNotice: string;
  postNotice: string;
}

interface Props {
  row: RowData;
}

const TableRow = ({ row }: Props) => {
  const values: string[] = [row.name, row.status, row.preNotice, row.postNotice];

  return (
    <MuiTableRow hover>
      {values.map((value: string, index: number) => (
        <TableCell key={index}>
          {index === 1 ? <StatusChip status={value} /> : value}
        </TableCell>
      ))}
    </MuiTableRow>
  );
};

export default TableRow;
