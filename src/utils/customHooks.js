import React, { useEffect, useState } from "react";

const useDocTitle = (title) => {
  const [doctitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = `Owl | ${doctitle}`;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export { useDocTitle };
