Questions = new Meteor.Collection("questions");

if (Meteor.isServer) {
	Questions.allow({
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
	
	Meteor.publish("questions", function() {
		return Shops.find();
	});
} else {
	Meteor.subscribe("questions");
}