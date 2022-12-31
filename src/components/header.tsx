import React, { FC } from 'react';
import { Link/*, useStaticQuery, graphql*/ } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const Header: FC = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     logo: file(absolutePath: { regex: "/gatsby-icon.png/" }) {
  //       childImageSharp {
  //         fixed(width: 50, height: 50, quality: 95) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    }}>
      <StaticImage
        src="../../content/assets/gatsby-icon.png"
        alt="logo"
        className="logo"
        width={50}
        height={50}
        quality={95}
      />

      <nav>
        <Link style={{ marginLeft: '1rem' }} to="/">Home</Link>
        <Link style={{ marginLeft: '1rem' }} to="/tags">Tags</Link>
        <Link style={{ marginLeft: '1rem' }} to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;