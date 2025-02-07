// Description: This file contains the functions that are used to make requests to the server.
export async function getApiResponse(sub_url: string) {
  // try to make a request to the server
  try {
    // create the url
    const url = `${process.env.NEXT_PUBLIC_API_URL}${sub_url}`;

    // create the options
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    };

    // reequest to the server
    const res = await fetch(url, options);
    // get the data from the response if the response is ok
    const data = res.ok ? await res.json() : Promise.reject(res);

    // return the data
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
