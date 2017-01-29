// @flow
import React from 'react';
import { Text, View } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import HTMLContentView from 'components/HTMLContentView';

const html = `
<p>Študij računalništva in informatike na Fakulteti za računalništvo in informatiko Univerze v Ljubljani je študij z najdaljšo tradicijo na tem področju v Sloveniji. Študentom ponuja temeljna in praktična znanja, ki so potrebna za delo v stroki, v skladu z najsodobnejšimi merili in standardi, ki za tovrstno izobraževanje veljajo v svetu. Zaradi izbirnosti v programu naši diplomanti niso strogo usmerjeni le v stroko, temveč so široko razgledani in visoko usposobljeni strokovnjaki.</p>
`;

const Header = ({ program }: HeaderProps) => (
  <View>
    <Text style={headerStyles.title}>
      {program.title.toUpperCase()}
    </Text>
    <Text style={headerStyles.subtitle}>
      {program.subtitle.toUpperCase()}
    </Text>
  </View>
);

type HeaderProps = {
  program: ProgramType,
};

const headerStyles = StyleSheet.create({
  title: {
    fontWeight: 'Bold',
    fontSize: 22,
    color: '#444444',
  },
  subtitle: {
    fontWeight: 'Bold',
    fontSize: 15,
    color: '#b4b4b4',
  },
});

const ProgramCardScene = ({ program }: Props) => (
  <CardView header={<Header program={program} />}>
    <Text style={styles.heading1}>
      NAZIV
    </Text>
    <Text style={styles.paragraph}>
      {program.gradTitle}
    </Text>
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    <HTMLContentView content={html} />
  </CardView>
);

type Props = {
  program: ProgramType,
};

const styles = StyleSheet.create({
  heading1: {
    fontWeight: 'Bold',
    fontSize: 15,
    color: '#444444',
    marginTop: 20,
    marginBottom: 6,
  },
  paragraph: {
    fontWeight: 'Light',
    fontSize: 13,
    lineHeight: 20,
    color: '#444444',
  },
});

export default ProgramCardScene;
