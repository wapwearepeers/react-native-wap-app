export default {
  create: {
    INFO_THEME: {
      title: "Why are some WAP themes unusable?",
      description: "When a theme is unusable, it means there are existing WAP proposals using this theme. In this case, you can either join the existing WAP, or create a different theme.",
    },
    INFO_TOPIC: {
      title: "What is a sharing?",
      description: function(currentTheme) {
        return `A sharing can be either your experience, interest, knowledge or questions.

You can share through showing, explaining, discussions or activities within 20 min.

In this WAP, your sharing should be related to ${currentTheme}.`
      },
    },
    INFO_DATE: {
      title: "Why can’t I choose the time?",
      description: "WAP is organized regularly on the same date and time in order to gather the community together.",
    },
    INFO_PLACE: {
      title: "What are the places?",
      description: `WAP happens in both physical or virtual places. The proposed physical places are selected to be the best for knowledge sharing. At each physical place, you will find a WAP sign where you will meet your group.`,
    },
  },
};
