
// import CandidateTable from '../../organisms/CandidateTable';
// import MainTemplate from '../../templates/MainTemplate';
import MainTemplate from '../../components/templates/MainTemplate';
import CandidateTable from '../../components/organisms/CandidateTable';

const Home = () => {
  return (
    <MainTemplate>
      <h2>Candidate Information</h2>
      <CandidateTable />
    </MainTemplate>
  );
};

export default Home;