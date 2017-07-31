import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
//import { ExpoConfigView } from '@expo/samples';

import Colors from '../constants/Colors'

export default class TipsScreen extends React.Component {
  static navigationOptions = {
    title: 'Tips',
    headerTintColor: "#000",
    //header: null,
  };

  _goToDetail(title, content) {
    this.props.navigation.navigate('Detail', {title, content})
  }

  _onPressWhatIsWap() {
    this._goToDetail("What is WAP?", `What is WAP?

WAP is a knowledge sharing event in a group of 4 to 10.
What is special about WAP is that every participant can lead a sharing about her or his knowledge, experiences, interests or concerns.
WAP can be thematic or non-thematic. In a thematic WAP, every sharing is related to the theme of the WAP.


What is a sharing?

A sharing can be either your knowledge, experiences, interests or concerns.
You can share by teaching, explaining, discussions or activities within 20 min.
In a thematic WAP, your sharing will be related to the theme of the WAP.


How to participate?

1/As a creator
A creator initiates a WAP and leads a sharing.
2/As a participant
A participant joins a WAP, with or without leading a sharing.  Every participant is responsible for co-creating the whole WAP experience.`
)
  }

  _onPressRules() {
    this._goToDetail("Rules", `Before you share

1/Choose what to share (inspiration, experience, question, skil)
2/ Choose how to share (teaching, activity, discussion)


When you share

1/ Give the reason
Tell the group “Why I share this topic, how it is useful for others.”
2/Engage the group
Lead the group in participative ways, through questions, discussions and activities.
3/Give a call-to-action
Share my next step with this topic or propose actions to others.


When others share

1/ Watch the time
Each of us let time for everyone to share in 3 hours. (20 min - 40 min per participant).
2/ Be caring
None of us judges others’ topics. We create a neutral atmosphere for free expression.`)
  }

  _onPressWhatToShare() {
    this._goToDetail("What to share?", `Inspiration

What inspires you about the WAP theme (subtopics, ideas, people, projects, products...)?
What have you really enjoyed learning in this category (A course, an event, a talk, an online talk, a book, a skill…)?


Experience

What experiences in this theme had impact on you in your work and life?


Question

What problems currently frustrate you about the theme?
What kind of change/innovation you would like to see about this theme?


Skill

An activity that makes you feel good in your work / life?
What do you do with ease or differently from others?
What do people around you say you are good at?`
)
  }

  _onPressHowToShare() {
    this._goToDetail("How to share?", `By teaching

I show my knowledge and experience, to explain, to impress, to raise awareness, using performances, stories, datas, visuals, examples…
I can let my participants ask me all the questions they want to know.


By activity

I guide people to make something together.
I can give the group a creative project and the game rules.
I can lead a group activity to practise a new skill, have a new experience.


By discussion

I gather people around a question/ an issue/ a real problem.
I can choose a topic I want to dig in thoroughly, exploring all points and angles of view..
I can propose a menu of questions related to the topic.
I can ask an open question, let the group proposes its ideas and solutions.`
)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={this._onPressWhatIsWap.bind(this)}
            title="What is WAP?"
            color={Colors.tintColor}
            accessibilityLabel="What is WAP?"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={this._onPressRules.bind(this)}
            title="What are the game rules?"
            color={Colors.tintColor}
            accessibilityLabel="What are the game rules?"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={this._onPressWhatToShare.bind(this)}
            title="What to share?"
            color={Colors.tintColor}
            accessibilityLabel="What to share?"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={this._onPressHowToShare.bind(this)}
            title="How to share?"
            color={Colors.tintColor}
            accessibilityLabel="How to share?"
          />
        </View>
        {/*<ExpoConfigView />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonWrapper: {
    width:'100%',
    margin:8
  }
});
