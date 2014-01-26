Brigadir_result = new Meteor.Collection("brigadir_result");

if (Meteor.isServer) {
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

	Meteor.publish("brigadir_result", function() {
		return Shops.find();
	});
} else {
	Meteor.subscribe("brigadir_result");
}