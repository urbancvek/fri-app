// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParallaxScrollView from 'components/ParallaxScrollView';
import CompaniesList from 'components/CompaniesList';
import AboutFRIView from 'components/AboutFRIView';
import LabsList from 'components/LabsList';
import fetchAction from 'actions/fetchActions';

import type { ReducerType } from 'reducers';

@autobind
class InfoTabScene extends Component {
  props: Props;

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <ParallaxScrollView
        title="Info"
        tabs={['PODJETJA', 'O FRI', 'LABORATORIJI']}
        backgroundImage={require('assets/header_images/info_tab.png')}
      >
        <CompaniesList companies={this.props.companies} />
        <AboutFRIView content={this.props.aboutFRIContent} />
        <LabsList labs={this.props.labs} />
      </ParallaxScrollView>
    );
  }
}

type Props = {
  companies: Array<CompanyType>,
  aboutFRIContent: string,
  labs: Array<LabType>,
  fetchData: () => void,
};

const query = `{
  companies {
    title
    location
    image {
      url
      width
      height
    }
    accentColor
    content
  }

  data {
    aboutFRI
  }

  labs {
    title
    location
    image {
      url
    }
    content
  }
}`;

const select = ({ dataStore }: ReducerType) => ({
  companies: dataStore.companies,
  aboutFRIContent: dataStore.data.aboutFRI,
  labs: dataStore.labs,
});

const actions = (dispatch: Dispatch) => ({
  fetchData: () => dispatch(fetchAction({ query })),
});

export default connect(select, actions)(InfoTabScene);
