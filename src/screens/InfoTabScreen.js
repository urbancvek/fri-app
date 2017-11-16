// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import axios from 'axios';

import ParallaxScrollView from 'components/ParallaxScrollView';
import CompaniesList from 'components/CompaniesList';
import AboutFRIView from 'components/AboutFRIView';
import LabsList from 'components/LabsList';

type Props = {};

type State = {
  companies: Array<CompanyType>,
  aboutFRIContent: string,
  labs: Array<LabType>,
};

@autobind
class InfoTabScene extends Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  state = {
    companies: [],
    aboutFRIContent: '<div />',
    labs: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const companiesResponse = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/companies.json');
    this.setState({ companies: companiesResponse.data });

    const aboutFriResponse = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/aboutFRI.html');
    this.setState({ aboutFRIContent: aboutFriResponse.data });

    const labsResponse = await axios.get('https://raw.githubusercontent.com/garazaFRI/friappdata/master/data/labs.json');
    this.setState({ labs: labsResponse.data });
  }

  render() {
    return (
      <ParallaxScrollView
        title="Info"
        tabs={['PODJETJA', 'O FRI', 'LABORATORIJI']}
        backgroundImage={require('assets/header_images/info_tab.png')}
      >
        <CompaniesList companies={this.state.companies} />
        <AboutFRIView content={this.state.aboutFRIContent} />
        <LabsList labs={this.state.labs} />
      </ParallaxScrollView>
    );
  }
}

export default InfoTabScene;
