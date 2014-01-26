Questions = new Meteor.Collection("questions");

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
