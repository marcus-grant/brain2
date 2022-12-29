import React, { FC, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface Props {
  children: ReactNode[];
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="global-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;