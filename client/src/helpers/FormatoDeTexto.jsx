import React from "react";

export const formatText = (text) => {
  const textWithLineBreaks = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));

  return textWithLineBreaks;
};
