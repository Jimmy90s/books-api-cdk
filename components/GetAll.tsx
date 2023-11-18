"use client";
import React from "react";

const baseUrl = `${process.env.API_GATWAY_GET_ALL_BOOKS}`;
const url = `${process.env.API_GATWAY_GET_ALL_BOOKS}`;

function translateStatusToErrorMessage(status: any) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the photos.";
    default:
      return "There was an error retrieving the photos. Please try again.";
  }
}

function checkStatus(response: {
  ok: any;
  status: any;
  statusText: any;
  url: any;
}) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(
      `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
    );

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: { json: () => any }) {
  return response.json();
}

function delay(ms: number | undefined) {
  return function (x: unknown) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const photoAPI = {
  getAll() {
    return (
      fetch(baseUrl)
        // .then(delay(600))
        // .then(checkStatus)
        .then((data) => data.json())
    );
  },
};

export default function GetAll() {
  const [loading, setLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    photoAPI
      .getAll()
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {photos.map((photo) => {
          return (
            <li key={photo.id}>
              <h3>{photo.title}</h3>
            </li>
          );
        })}
      </ul>
    );
  }
}
