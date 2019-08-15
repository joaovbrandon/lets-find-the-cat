import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare, faInstagram, faYoutube, faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { socialMediaUrls } from '../../configs';
import { Container, SocialMedia, Copyright } from './styles';

const Footer = () => (
  <Container>
    <Copyright>
      Let&apos;s find the cat! · Copyright
      {` ${moment().year()} `}
      · All rights reserved
    </Copyright>
    <SocialMedia>
      {socialMediaUrls.facebook && (
        <a href={socialMediaUrls.facebook} rel="noreferrer noopener" target="_blank">
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
        </a>
      )}
      {socialMediaUrls.instagram && (
        <a href={socialMediaUrls.instagram} rel="noreferrer noopener" target="_blank">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
      )}
      {socialMediaUrls.youtube && (
        <a href={socialMediaUrls.youtube} rel="noreferrer noopener" target="_blank">
          <FontAwesomeIcon icon={faYoutube} size="lg" />
        </a>
      )}
      {socialMediaUrls.twitter && (
        <a href={socialMediaUrls.twitter} rel="noreferrer noopener" target="_blank">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
      )}
    </SocialMedia>
  </Container>
);

export default Footer;
