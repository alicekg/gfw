import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';

import Cover from 'components/cover';
import SubnavMenu from 'components/subnav-menu';
import Projects from 'pages/about/section-projects';
import Join from 'pages/about/section-join';
import Button from 'components/ui/button';
import Icon from 'components/ui/icon';
import ModalVideo from 'components/modals/video';

import HistorySection from 'pages/about/section-history';
import Impacts from 'pages/about/section-impacts';
import Partners from 'pages/about/section-partners';
import How from 'pages/about/section-how';
import Contact from 'pages/about/section-contact';

import mailIcon from 'assets/icons/mail.svg';
import bgImage from './header-bg';
import './styles.scss';

const sectionComponents = {
  history: HistorySection,
  impacts: Impacts,
  partners: Partners,
  how: How,
  contact: Contact
};

class AboutPage extends PureComponent {
  static propTypes = {
    sections: PropTypes.object,
    setModalVideoData: PropTypes.func.isRequired
  };

  render() {
    const { sections, setModalVideoData } = this.props;
    return (
      <div className="l-about-page">
        <Cover
          title="About"
          description="Global Forest Watch (GFW) is an online platform that provides data and tools for monitoring forests. By harnessing cutting-edge technology, GFW allows anyone to access near real-time information about where and how forests are changing around the world."
          bgImage={bgImage}
        >
          <Link className="subscribe-btn" to="/subscribe">
            <Button theme="square" className="subscribe-icon">
              <Icon icon={mailIcon} />
            </Button>
            <p className="subscribe-msg">SUBSCRIBE TO THE GFW NEWSLETTER</p>
          </Link>
        </Cover>
        <SubnavMenu
          className="about-links"
          links={Object.values(sections || {})}
        />
        <Projects setModalVideoData={setModalVideoData} />
        {sections &&
          Object.keys(sections).map(s => {
            const section = sections[s];
            const PageComponent = sectionComponents[section.component];
            return PageComponent ? (
              <div
                id={section.anchor}
                className={section.anchor}
                key={section.anchor}
              >
                <PageComponent />
              </div>
            ) : null;
          })}
        <Join />
        <ModalVideo />
      </div>
    );
  }
}

export default AboutPage;
