Meteor.publish("shops", function() {
	return Shops.find();
});

Meteor.publish("questionnaires", function() {
	return Questionnaires.find();
});

Meteor.publish("quesions", function() {
	return Quesions.find();
});

Meteor.publish("brigadir_result", function() {
	return Brigadir_result.find();
});