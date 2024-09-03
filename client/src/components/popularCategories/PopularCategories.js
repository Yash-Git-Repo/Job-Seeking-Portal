import React from "react";
import { MdWork } from "react-icons/md";
import "./PopularCategories.scss";

function PopularCategories() {
  const categories = [
    {
      id: 1,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 2,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 3,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 4,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 5,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 6,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 7,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
    {
      id: 8,
      title: "Web Developer",
      subtitle: "500 Open Position",
      icon: <MdWork />,
    },
  ];
  return (
    <div className="categories">
      <h3>Popular Categories</h3>
      <div className="banner">
        {categories?.map((item) => {
          return (
            <div className="card" key={item?.id}>
              <div className="icon">{item?.icon}</div>
              <div className="text">
                <p>{item?.title}</p>
                <p>{item?.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularCategories;
