import Navbar from "@components/Navbar";
import SearchResults from "@components/SearchResults";

// SearchPage component
const SearchPage = ({ params }: { params: { query: string } }) => {
    // get query from params
  const query = params.query;

  return (
    <>
      <Navbar />
      <SearchResults query={query} />
    </>
  );
};

export default SearchPage;
