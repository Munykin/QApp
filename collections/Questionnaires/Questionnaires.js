Questionnaires = new Meteor.Collection("questionnaires");

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
