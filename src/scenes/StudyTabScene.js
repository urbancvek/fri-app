// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParallaxScrollView from 'components/ParallaxScrollView';
import StudyProgramsList from 'components/StudyProgramsList';
import EnrollView from 'components/EnrollView';
import fetchAction from 'actions/fetchActions';

import type { ReducerType } from 'reducers';

@autobind
class StudyTabScene extends Component {
  props: Props;

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <ParallaxScrollView
        title="Študij"
        tabs={['PROGRAMI', 'VPIS']}
        backgroundImage={require('assets/header_images/study_tab.png')}
      >
        <StudyProgramsList studyPrograms={this.props.studyPrograms} />
        <EnrollView content={this.props.enrollContent} />
      </ParallaxScrollView>
    );
  }
}

type Props = {
  studyPrograms: {
    dodiplomski: Array<StudyProgramType>,
    magistrski: Array<StudyProgramType>,
    doktorski: Array<StudyProgramType>,
  },
  enrollContent: string,
  fetchData: () => void,
};

const query = `
{
  studyPrograms {
    dodiplomski {
      ...studyProgram
    }
    magistrski {
      ...studyProgram
    }
    doktorski {
      ...studyProgram
    }
  }
  
  data {
    enroll
  }
}

fragment studyProgram on StudyProgram {
  title
  subtitle
  gradTitle
  content
}
`;

const select = ({ dataStore }: ReducerType) => ({
  studyPrograms: dataStore.studyPrograms,
  enrollContent: dataStore.data.enroll,
});

const actions = (dispatch: Dispatch) => ({
  fetchData: () => dispatch(fetchAction({ query })),
});

export default connect(select, actions)(StudyTabScene);
