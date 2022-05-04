import React from 'react';
import Navbar from '@theme-original/Navbar';
// import CheckUpdates from '../../components/check-updates'

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      {/*<CheckUpdates />*/}
    </>
  );
}
