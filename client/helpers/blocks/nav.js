Handlebars.registerHelper('active', function(path) {
	if (Router.current().path === path) {
		return "active";
	}
});

Template.nav.userOnlineCount = function() {
	Meteor.subscribe('users');
	return Meteor.users.find({"profile.online": true}).count();
};