import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Job from './Job';
import useFetchJobs from './useFetchJobs';
import './bootstrap.min.css'
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

function App() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

  const handleParamChange = e => {
    setPage(1)
    setParams(prevParams => ({ ...prevParams, [e.target.name]: e.target.value }))
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GITHUB JOBS</h1>
      <SearchForm params={params} handleParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing...</h1>}
      {jobs.map(job => (<Job key={job.id} job={job} />))}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>

  );
}

export default App;
