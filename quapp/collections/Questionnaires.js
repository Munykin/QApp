Questionnaires = new Meteor.Collection("questionnaires");

if (Meteor.isServer) {
	Questionnaires.allow({
		'insert': function(userId, doc) {
			return true
		},

		'update': function(userId, docs, fields, modifier) {
			return true;
		},

		'remove': function(userId, docs) {
			return true;
		}
	});
	
	Meteor.publish("questionnaires", function() {
		return Shops.find();
	});
} else {
	Meteor.subscribe("questionnaires");
}