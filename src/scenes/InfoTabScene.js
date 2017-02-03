// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';

import ParallaxScrollView from 'components/ParallaxScrollView';
import CompaniesList from 'components/CompaniesList';
import AboutFRIView from 'components/AboutFRIView';
import LabsList from 'components/LabsList';
import companies from 'data/companies.json';
import aboutFRIContent from 'data/aboutFRI';
import labs from 'data/labs.json';

@autobind
class InfoTabScene extends Component {
  render() {
    return (
      <ParallaxScrollView
        title="Info"
        tabs={['PODJETJA', 'O FRI', 'LABORATORIJI']}
        backgroundImage={require('assets/header_images/info_tab.png')}
      >
        <CompaniesList companies={companies} />
        <AboutFRIView content={aboutFRIContent} />
        <LabsList labs={labs} />
      </ParallaxScrollView>
    );
  }
}

export default InfoTabScene;
