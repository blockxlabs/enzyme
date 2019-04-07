import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const getFavicon = url => {
  if (url) {
    return <img src={url} alt="fav" style={{ width: 20, height: 20 }} />;
  }
  return <FontAwesomeIcon icon={faFile} style={{ color: '#000000', fontSize: 20 }} />;
};

const getBigFavicon = url => {
  if (url) {
    return <img src={url} alt="fav" style={{ width: 64, height: 64 }} />;
  }
  return <FontAwesomeIcon icon={faFile} style={{ color: '#000000', fontSize: 20 }} />;
};

export { getFavicon, getBigFavicon };
