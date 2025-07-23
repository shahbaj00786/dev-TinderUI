import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, photoUrl, skills, gender } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm ">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{skills.join(", ")}</p>
        <p> {about} </p>
        {gender && <p>{gender}</p>}
        <div className="card-actions  justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
