async function loadTotalPages() {
  const BACKEND_URL = await fetch("/api").then((res) => {
    return res.text();
  });

  const response = await fetch(BACKEND_URL + "/page");

  const pageNumber = await response.totalPages;
  return pageNumber;
}




