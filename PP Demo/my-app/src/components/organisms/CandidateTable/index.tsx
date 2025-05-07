import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
} from '@mui/material';
import CustomTableRow from '../../molecules/TableRow';
import TableHeading from '../../atoms/Typography';


const names = ['John Smith', 'Sarene', 'Walsh', 'Maurizia'];
const dates = ['2/22/2022', '3/13/2022', '7/2/2022', '2/20/2022'];
const commonStatus = 'SCHEDULED';

const rows = names.map((name, index) => ({
  name,
  status: commonStatus,
  preNotice: dates[index],
  postNotice: dates[index],
}));

const CandidateTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeading label="Name" />
            <TableHeading label="Status" />
            <TableHeading label="Pre Notice Date" />
            <TableHeading label="Post Notice Date" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <CustomTableRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidateTable;
