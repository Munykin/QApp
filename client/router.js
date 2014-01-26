Router.configure({ layoutTemplate: 'layout' });
Router.map(function() {
    this.route('main', { 
        path: '/',
        template: 'main',
        waitOn: function() {
        	return [
        		Meteor.subscribe("shops"),
        		Meteor.subscribe("questionnaires"),
        		Meteor.subscribe("questions"),
        		Meteor.subscribe("brigadir_result")
        	]
        },
        data: function() {
        	return {
        		shops: function() {
        			var srvyr = Session.get('srvyr');
					if(Session.get('day')){
						//тут получим анкеты из которых возмем ids shop
						var shop_ids = _.pluck(Questionnaires.find({'day': Session.get('day')}, {}).fetch(), 'shop_id'),
						shop_obj_arr = [];
						_.each(shop_ids, function(value){
								shop_obj_arr.push({
								id: value
							});
						});
						return Shops.find( { $or: shop_obj_arr }, {});
					} else {
						return Shops.find({}, {});
					}
        		},
        		questionnaries: function() {
        			return Questionnaires.find();
        		},
        		brigadir_result: function() {
        			return Brigadir_result.find();
        		},
        		questions: function() {
        			return Questions.find();
        		}
        	}
        }
    });
});