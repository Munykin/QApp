Shops = new Meteor.Collection("shops");

if (Meteor.isServer) {
	Shops.allow({
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
	
	Meteor.publish("shops", function() {
		return Shops.find();
	});
} else {
	Meteor.subscribe("shops");
}