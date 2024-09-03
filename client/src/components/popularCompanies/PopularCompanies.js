import React from "react";
import { FaMicrosoft } from "react-icons/fa";
import './PopularCompanies.scss'

function PopularCompanies() {
  const companies = [
    {
      id: 1,
      title: "Web Developer",
      location: "Nagpur",
      openPosition: "500 Open Position",
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Web Developer",
      location: "Nagpur",
      openPosition: "500 Open Position",
      icon: <FaMicrosoft />,
    },
    {
      id: 3,
      title: "Web Developer",
      location: "Nagpur",
      openPosition: "500 Open Position",
      icon: <FaMicrosoft />,
    },
  ];
  return (
    <div className="categories">
      <h3>Popular Companies</h3>
      <div className="banner">
        {companies?.map((item) => {
          return (
            <div className="card" key={item.id}>
              <div className="content">
                <div className="icon">{item.icon}</div>
                <div className="text">
                  <p>{item.title}</p>
                  <p>{item.location}</p>
                </div>
              </div>
              <button className="btn">
                Open Positions {item.openPosition}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularCompanies;
