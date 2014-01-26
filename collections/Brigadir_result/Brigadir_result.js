Brigadir_result = new Meteor.Collection("brigadir_result");

Brigadir_result.allow({
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