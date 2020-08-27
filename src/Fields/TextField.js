import React from 'react';

export default function TextField({record, source}) {
  return (
    <span>{record[source]}</span>
  )
}
