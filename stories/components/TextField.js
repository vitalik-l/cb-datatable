import React from 'react';

export default function({row, source}) {
  return (
    <span>{row[source]}</span>
  )
}
