import React from 'react';

export const sortAlphabetically = (prop) => {
  return (a,b) => {
    let nameA=a[prop].toLowerCase(), nameB=b[prop].toLowerCase();
    if (nameA < nameB) //sort string ascending
      return -1;
    if (nameA > nameB)
      return 1;
    return 0; //default return value (no sorting)
  }
};

export const sortByLookup = (prop, lookup) => {
  return (a,b) => {
    let nameA=lookup[a[prop]].toLowerCase(), nameB=lookup[b[prop]].toLowerCase();
    if (nameA < nameB) //sort string ascending
      return -1;
    if (nameA > nameB)
      return 1;
    return 0; //default return value (no sorting)
  }
};

