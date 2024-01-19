import React from "react";

function ReadMore({ children }: any) {
  const text = children;
  const [isReadMore, setIsReadMore] = React.useState(false);
  // chnage read more word count here
  const slicewordcount = 200;

  // toggle read more
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const slicedText = isReadMore ? text : text.slice(0, slicewordcount);
  return (
    <div>
      <p className="text-sm my-2 mb-2 font-poppins">
        {slicedText}
        {text.length > slicewordcount && (
          <span
            onClick={toggleReadMore}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isReadMore ? " Show Less" : "...Read More"}
          </span>
        )}
      </p>
    </div>
  );
}

export default ReadMore;
