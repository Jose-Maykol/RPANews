import React, { useContext } from "react";
import { ApiContext } from '../../context';
import { Link } from "react-router-dom";

const CurrentNews = () => {

  const { Current } = useContext(ApiContext);

  return (
    <div>
      {Current ?
        Current.map(news =>
          <div className="card d-flex flex-row mb-2 p-3 my-3 mx-5" key={news.publishedAt}>
            <img
              src={news.urlToImage}
              className="card-img-top img-fluid w-50" alt="..."
            />
            <div className="card-body d-flex flex-column justify-content-between align-items-start ">
              <div className=" p-2 bg-primary rounded-3 my-1">{news.source.name}</div>
              <h5 className="card-title my-1">{news.title}</h5>
              <p className="card-text my-1">{news.description}</p>
              <div className="align-self-end">
                <Link to={`/detail/${news.publishedAt}`}>
                  <span className="btn btn-dark"> Leer más</span>
                </Link>
              </div>
            </div>
          </div>
        )
        : <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    </div>
  );
}

export default CurrentNews;