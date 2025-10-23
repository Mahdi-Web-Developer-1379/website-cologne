import React from "react";

const Description = ({longDescription}) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <p>
         {longDescription}
      </p>
    </div>
  );
};

export default Description;
