import React from 'react';

// sorts alphabetically based on field 'prop'
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

// sorts numerically based on numerical field 'prop'
export const sortNumerically = (prop) => {
  // if prop not a number then return ???
  return (a, b) => (a[prop] - b[prop]);
};

// sorts alphabetically based on the value found in lookup for each item[prop]
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

