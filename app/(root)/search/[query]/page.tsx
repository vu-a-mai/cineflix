import Navbar from "@components/Navbar";
import SearchResults from "@components/SearchResults";

type SearchParams = {
  params: Promise<{ query: string }>
}

// SearchPage component
const SearchPage = async ({ params }: SearchParams) => {    // get query from params
    const { query } = await params;

  return (
    <>
      <Navbar />
      <SearchResults query={query} />
    </>
  );
};

export default SearchPage;
